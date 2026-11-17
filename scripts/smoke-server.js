/* eslint-disable @typescript-eslint/no-var-requires */
// Starts the built server against a seeded local test database and fails if a
// page or the API serves no data. Unit and integration tests import the schema
// directly, so they miss a server bundle that cannot load it. Run it after
// `npm run build`. It empties the test database from test/database.js.
// Usage: node scripts/smoke-server.js [directory that holds server.js]
const crypto = require('crypto');
const { execSync, spawn } = require('child_process');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { parts, url, assertTestDatabase } = require('../test/database');

const PORT = 8081;
const BASE = `http://127.0.0.1:${PORT}`;
const READY_TIMEOUT_MS = 90000;
const MARKER = `smoke-${crypto.randomBytes(4).toString('hex')}`;
const PAGES = ['/', '/posts', '/projects', '/readings'];
const SERVER_DIR = path.resolve(process.argv[2] || path.join(__dirname, '..'));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const seed = async () => {
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    await prisma.$transaction([
      prisma.link.deleteMany(),
      prisma.post.deleteMany(),
      prisma.project.deleteMany(),
      prisma.reading.deleteMany(),
      prisma.aboutPage.deleteMany(),
      prisma.postsPage.deleteMany(),
      prisma.projectsPage.deleteMany(),
      prisma.readingsPage.deleteMany(),
    ]);
    await prisma.aboutPage.create({
      data: {
        title: `about ${MARKER}`,
        bio: `bio ${MARKER}`,
        pictureURL: 'https://example.com/picture.png',
        links: { create: [{ name: 'example', url: 'https://example.com' }] },
      },
    });
    await prisma.postsPage.create({
      data: {
        summary: `posts ${MARKER}`,
        posts: {
          create: [
            {
              title: 'A post',
              snippet: 'A snippet',
              url: 'https://example.com/post',
              originalPublishDate: new Date('2021-10-16T12:00:00Z'),
            },
          ],
        },
      },
    });
    await prisma.projectsPage.create({
      data: { summary: `projects ${MARKER}` },
    });
    await prisma.readingsPage.create({
      data: { summary: `readings ${MARKER}` },
    });
  } finally {
    await prisma.$disconnect();
  }
};

const startServer = () =>
  spawn('node', ['server.js'], {
    cwd: SERVER_DIR,
    env: {
      ...process.env,
      ...parts,
      NODE_ENV: 'production',
      PORT: String(PORT),
      SESSION_COOKIE_SECRET: crypto.randomBytes(32).toString('base64'),
    },
    stdio: ['ignore', 'inherit', 'inherit'],
  });

const waitForReady = async server => {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`The server exited with code ${server.exitCode}`);
    }
    try {
      const response = await fetch(`${BASE}/api/ready`);
      if (response.ok) return;
    } catch (error) {
      // not listening yet
    }
    await sleep(1000);
  }
  throw new Error(`/api/ready did not answer 200 in ${READY_TIMEOUT_MS} ms`);
};

const checkPage = async page => {
  const response = await fetch(`${BASE}${page}`);
  const html = await response.text();
  const problems = [];
  if (response.status !== 200) problems.push(`status ${response.status}`);
  if (html.includes('"initialApolloState":null')) problems.push('no data');
  if (!html.includes(MARKER)) problems.push('no seeded content');
  if (!response.headers.get('content-security-policy')) {
    problems.push('no Content-Security-Policy header');
  }
  return problems;
};

const checkApi = async () => {
  const response = await fetch(`${BASE}/api/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ readingsPage { summary } }' }),
  });
  const body = await response.json();
  return body?.data?.readingsPage?.summary === `readings ${MARKER}`
    ? []
    : [`unexpected answer ${JSON.stringify(body)}`];
};

const main = async () => {
  assertTestDatabase();
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL_LOCAL_USE_ONLY: url },
    stdio: 'inherit',
  });
  await seed();

  const server = startServer();
  let failed = false;
  try {
    await waitForReady(server);
    for (const [name, problems] of [
      ...(await Promise.all(PAGES.map(async p => [p, await checkPage(p)]))),
      ['/api/graphql', await checkApi()],
    ]) {
      console.log(`${name}: ${problems.length ? problems.join(', ') : 'ok'}`);
      if (problems.length) failed = true;
    }
  } catch (error) {
    console.error(error.message);
    failed = true;
  } finally {
    server.kill('SIGKILL');
  }
  process.exit(failed ? 1 : 0);
};

main();
