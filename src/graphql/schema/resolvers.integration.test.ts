import bcrypt from 'bcryptjs';
import { graphql } from 'graphql';

import schema from '.';
import { requireActiveAccount } from './auth';
import {
  ContextInterface,
  IncomingMessageWithSession,
  SESSION_MAX_AGE_MS,
  resolveContext,
} from './context';
import { prisma } from './resolvers/postgresql';

// Joined at runtime, because ESLint's no-script-url flags the literal.
const SCRIPT_URL = ['javascript', 'alert(1)'].join(':');

const PASSWORD = 'integration-test-password';
let passwordHash: string;
let ipCounter = 0;

// Each context gets its own client IP, so the login limiter never carries over.
const createContext = (): ContextInterface => {
  ipCounter += 1;
  const req = ({
    headers: {},
    socket: { remoteAddress: `192.0.2.${ipCounter}` },
    session: null,
  } as unknown) as IncomingMessageWithSession;
  return resolveContext({ req });
};

const run = (
  context: ContextInterface,
  source: string,
  variableValues?: Record<string, unknown>
) => graphql({ schema, source, variableValues, contextValue: context });

const createAccount = (username: string, isActive = true) =>
  prisma.account.create({
    data: { username, password: passwordHash, isActive },
  });

const LOGIN = `
  mutation Login($input: AttemptLoginInput!) {
    attemptLogin(input: $input) { wasSuccessful }
  }
`;

const FETCH_POSTS = `
  query { postsPage { summary posts { title originalPublishDate } } }
`;

const UPDATE_POSTS = `
  mutation Update($input: UpdatePostsPageInput!) {
    updatePostsPage(input: $input) { summary posts { title url originalPublishDate } }
  }
`;

const post = (title: string, originalPublishDate: number) => ({
  title,
  originalPublishDate,
  snippet: `${title} snippet`,
  url: `https://example.com/${title}`,
});

const login = async (username: string, password = PASSWORD) => {
  const context = createContext();
  const result = await run(context, LOGIN, {
    input: { username, password },
  });
  return { context, result };
};

beforeAll(async () => {
  passwordHash = await bcrypt.hash(PASSWORD, 10);
});

beforeEach(async () => {
  const tables: Array<{ tablename: string }> = await prisma.$queryRawUnsafe(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`
  );
  await prisma.$executeRawUnsafe(
    `TRUNCATE ${tables
      .map(({ tablename }) => `"${tablename}"`)
      .join(', ')} RESTART IDENTITY CASCADE`
  );
});

afterAll(() => prisma.$disconnect());

describe('attemptLogin', () => {
  it('starts a session for the right password', async () => {
    const account = await createAccount('owner');
    const { context, result } = await login('owner');

    expect(result.errors).toBeUndefined();
    expect(result.data?.attemptLogin.wasSuccessful).toBe(true);
    expect(context.session.get()).toMatchObject({
      accountId: account.id,
      sessionVersion: 0,
    });
    const stored = await prisma.account.findUnique({
      where: { id: account.id },
    });
    expect(stored?.lastLoginAt).toBeInstanceOf(Date);
  });

  it('refuses a wrong password, an unknown user, and an inactive account', async () => {
    await createAccount('owner');
    await createAccount('retired', false);

    const attempts = await Promise.all([
      login('owner', 'wrong-password'),
      login('nobody'),
      login('retired'),
    ]);
    attempts.forEach(({ context, result }) => {
      expect(result.data?.attemptLogin.wasSuccessful).toBe(false);
      expect(context.session.get()).toBeNull();
    });
  });

  it('answers RATE_LIMITED after 5 failures from one IP', async () => {
    const warn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);
    await createAccount('owner');
    const context = createContext();
    for (let i = 0; i < 5; i += 1) {
      await run(context, LOGIN, {
        input: { username: 'owner', password: 'wrong-password' },
      });
    }
    const result = await run(context, LOGIN, {
      input: { username: 'owner', password: PASSWORD },
    });
    expect(result.errors?.[0].extensions?.code).toBe('RATE_LIMITED');
    expect(context.session.get()).toBeNull();
    expect(warn).toHaveBeenCalledWith('login rate limit reached');
    warn.mockRestore();
  });
});

describe('requireActiveAccount', () => {
  it('accepts a fresh session of an active account', async () => {
    const account = await createAccount('owner');
    const { context } = await login('owner');
    await expect(requireActiveAccount(context)).resolves.toMatchObject({
      id: account.id,
    });
  });

  it('refuses a missing session', async () => {
    await expect(requireActiveAccount(createContext())).rejects.toMatchObject({
      extensions: { code: 'UNAUTHENTICATED' },
    });
  });

  it('refuses a session older than 30 days', async () => {
    await createAccount('owner');
    const { context } = await login('owner');
    const session = context.session.get();
    if (session) {
      session.issuedAt = Date.now() - SESSION_MAX_AGE_MS - 1;
    }
    await expect(requireActiveAccount(context)).rejects.toMatchObject({
      extensions: { code: 'UNAUTHENTICATED' },
    });
  });

  it('refuses a revoked session and a deactivated account', async () => {
    const account = await createAccount('owner');
    const revoked = await login('owner');
    const deactivated = await login('owner');

    await prisma.account.update({
      where: { id: account.id },
      data: { sessionVersion: { increment: 1 } },
    });
    await expect(requireActiveAccount(revoked.context)).rejects.toMatchObject({
      extensions: { code: 'UNAUTHENTICATED' },
    });

    const session = deactivated.context.session.get();
    if (session) {
      session.sessionVersion = 1;
    }
    await prisma.account.update({
      where: { id: account.id },
      data: { isActive: false },
    });
    await expect(
      requireActiveAccount(deactivated.context)
    ).rejects.toMatchObject({ extensions: { code: 'UNAUTHENTICATED' } });
  });
});

describe('posts page', () => {
  it('answers an empty page before the first save', async () => {
    const result = await run(createContext(), FETCH_POSTS);
    expect(result.data?.postsPage).toEqual({ summary: '', posts: [] });
  });

  it('refuses a save without a session and writes nothing', async () => {
    const result = await run(createContext(), UPDATE_POSTS, {
      input: { summary: 's', posts: [post('a', Date.UTC(2020, 0, 1, 12))] },
    });
    expect(result.errors?.[0].extensions?.code).toBe('UNAUTHENTICATED');
    expect(await prisma.postsPage.count()).toBe(0);
  });

  it('adds a version on every save and serves the newest', async () => {
    await createAccount('owner');
    const { context } = await login('owner');

    const first = await run(context, UPDATE_POSTS, {
      input: {
        summary: 'first',
        posts: [
          post('old', Date.UTC(2017, 0, 29, 12)),
          post('new', Date.UTC(2020, 5, 1, 12)),
        ],
      },
    });
    expect(first.errors).toBeUndefined();
    expect(
      first.data?.updatePostsPage.posts.map((p: { title: string }) => p.title)
    ).toEqual(['new', 'old']);

    await run(context, UPDATE_POSTS, {
      input: {
        summary: 'second',
        posts: [post('only', Date.UTC(2021, 0, 1, 12))],
      },
    });

    const pages = await prisma.postsPage.findMany({
      include: { posts: true },
      orderBy: { version: 'asc' },
    });
    expect(pages.map(page => [page.summary, page.posts.length])).toEqual([
      ['first', 2],
      ['second', 1],
    ]);

    const fetched = await run(createContext(), FETCH_POSTS);
    expect(fetched.data?.postsPage).toEqual({
      summary: 'second',
      posts: [{ title: 'only', originalPublishDate: Date.UTC(2021, 0, 1, 12) }],
    });
  });

  it('refuses an invalid URL with BAD_USER_INPUT and writes nothing', async () => {
    await createAccount('owner');
    const { context } = await login('owner');

    const result = await run(context, UPDATE_POSTS, {
      input: {
        summary: 's',
        posts: [{ ...post('a', Date.UTC(2020, 0, 1, 12)), url: SCRIPT_URL }],
      },
    });
    expect(result.errors?.[0].extensions?.code).toBe('BAD_USER_INPUT');
    expect(await prisma.postsPage.count()).toBe(0);
  });

  it('refuses a date that is not epoch milliseconds', async () => {
    await createAccount('owner');
    const { context } = await login('owner');

    const result = await run(context, UPDATE_POSTS, {
      input: {
        summary: 's',
        posts: [post('a', ('2020-01-01' as unknown) as number)],
      },
    });
    expect(result.errors?.[0].message).toMatch(/Invalid Date value/);
    expect(await prisma.postsPage.count()).toBe(0);
  });
});
