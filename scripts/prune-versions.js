#!/usr/bin/env node
// Delete old page versions, keeping the newest ones of each page type.
// It only prints what it would delete, unless you pass --apply.
// Usage: DATABASE_URL=postgresql://... node scripts/prune-versions.js [--keep 20] [--apply]
/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');

const DEFAULT_KEEP = 20;

// Each page model and the child model whose rows point at its version.
const PAGE_TYPES = [
  { page: 'aboutPage', child: 'link' },
  { page: 'postsPage', child: 'post' },
  { page: 'projectsPage', child: 'project' },
  { page: 'readingsPage', child: 'reading' },
];

const parseArgs = argv => {
  const keepIndex = argv.indexOf('--keep');
  const keep = keepIndex === -1 ? DEFAULT_KEEP : Number(argv[keepIndex + 1]);
  if (!Number.isInteger(keep) || keep < 1) {
    throw new Error('--keep must be a whole number of at least 1.');
  }
  return { keep, apply: argv.includes('--apply') };
};

// Returns what it deleted, or would delete, per page type.
const prune = async (prisma, { keep, apply, log = console.log }) => {
  const plan = [];
  for (const { page, child } of PAGE_TYPES) {
    const old = await prisma[page].findMany({
      select: { version: true },
      orderBy: { version: 'desc' },
      skip: keep,
    });
    const versions = old.map(row => row.version);
    const children = versions.length
      ? await prisma[child].count({
          where: { pageVersionThatReference: { in: versions } },
        })
      : 0;
    plan.push({ page, child, versions, children });
    log(
      versions.length
        ? `${page}: delete ${versions.length} versions (${
            versions[versions.length - 1]
          } to ${versions[0]}) and ${children} ${child} rows`
        : `${page}: nothing to delete`
    );
  }

  if (!apply) {
    log('Dry run. Pass --apply to delete.');
    return plan;
  }

  // Children before parents, all in one transaction.
  const deletes = [];
  plan.forEach(({ page, child, versions }) => {
    if (!versions.length) return;
    deletes.push(
      prisma[child].deleteMany({
        where: { pageVersionThatReference: { in: versions } },
      }),
      prisma[page].deleteMany({ where: { version: { in: versions } } })
    );
  });
  await prisma.$transaction(deletes);
  log('Deleted.');
  return plan;
};

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Set the database URL in the environment first.');
  }
  const options = parseArgs(process.argv.slice(2));
  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });
  try {
    await prune(prisma, options);
  } finally {
    await prisma.$disconnect();
  }
};

if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = { parseArgs, prune };
