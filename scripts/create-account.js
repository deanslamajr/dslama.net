#!/usr/bin/env node
// Create a login account, or reset its password with --reset-password.
// Usage: DATABASE_URL=postgresql://... node scripts/create-account.js [--reset-password]
const readline = require('readline');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const MIN_PASSWORD_LENGTH = 12;
const isReset = process.argv.includes('--reset-password');

const ask = (question, hidden) =>
  new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      // Write the prompt, but never echo what the user types.
      rl._writeToOutput = text => {
        if (text.includes(question)) rl.output.write(question);
      };
    }
    rl.question(question, answer => {
      if (hidden) rl.output.write('\n');
      rl.close();
      resolve(answer);
    });
  });

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Set the database URL in the environment first.');
  }
  const username = (await ask('Username: ', false)).trim();
  if (!username) throw new Error('The username must not be empty.');
  const password = await ask('Password: ', true);
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`The password must have at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if ((await ask('Password again: ', true)) !== password) {
    throw new Error('The passwords do not match.');
  }
  const hash = await bcrypt.hash(password, 12);

  const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
  try {
    if (isReset) {
      const account = await prisma.account.update({
        where: { username },
        data: { password: hash, sessionVersion: { increment: 1 } },
      });
      console.log(`Password reset for account ${account.id}. Existing sessions are revoked.`);
    } else {
      const account = await prisma.account.create({
        data: { username, password: hash, isActive: true },
      });
      console.log(`Created account ${account.id}.`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

main().catch(error => {
  const messages = {
    P2002: 'That username already exists.',
    P2025: 'No account has that username.',
  };
  console.error(messages[error.code] || error.message);
  process.exit(1);
});
