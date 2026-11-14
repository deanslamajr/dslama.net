import { prisma } from './graphql/schema/resolvers/postgresql';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parseArgs, prune } = require('../scripts/prune-versions');

const createPostsVersions = async (count: number) => {
  for (let index = 1; index <= count; index += 1) {
    await prisma.postsPage.create({
      data: {
        summary: `v${index}`,
        posts: {
          create: [
            {
              title: `p${index}`,
              url: 'https://example.com',
              snippet: 's',
              originalPublishDate: new Date(Date.UTC(2020, 0, 1)),
            },
          ],
        },
      },
    });
  }
};

beforeEach(async () => {
  await prisma.$executeRawUnsafe(
    'TRUNCATE "Post", "PostsPage", "Link", "AboutPage" RESTART IDENTITY CASCADE'
  );
});

afterAll(() => prisma.$disconnect());

describe('prune-versions', () => {
  it('only reports in a dry run', async () => {
    await createPostsVersions(5);
    const log = jest.fn();

    const plan = await prune(prisma, { keep: 2, apply: false, log });

    expect(
      plan.find((p: { page: string }) => p.page === 'postsPage')
    ).toMatchObject({
      versions: [3, 2, 1],
      children: 3,
    });
    expect(log).toHaveBeenCalledWith(
      'postsPage: delete 3 versions (1 to 3) and 3 post rows'
    );
    expect(await prisma.postsPage.count()).toBe(5);
  });

  it('deletes old versions and their children with --apply', async () => {
    await createPostsVersions(5);
    await prisma.aboutPage.create({
      data: { title: 't', bio: '', pictureURL: '' },
    });

    await prune(prisma, { keep: 2, apply: true, log: jest.fn() });

    const kept = await prisma.postsPage.findMany({ select: { version: true } });
    expect(kept.map(row => row.version).sort()).toEqual([4, 5]);
    expect(await prisma.post.count()).toBe(2);
    expect(await prisma.aboutPage.count()).toBe(1);
  });

  it('parses --keep and refuses values below 1', () => {
    expect(parseArgs([])).toEqual({ keep: 20, apply: false });
    expect(parseArgs(['--keep', '5', '--apply'])).toEqual({
      keep: 5,
      apply: true,
    });
    expect(() => parseArgs(['--keep', '0'])).toThrow('--keep');
  });
});
