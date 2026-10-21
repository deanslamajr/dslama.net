import { PrismaClient } from '@prisma/client';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { DB_USER, DB_PASS, DB_HOST, DB_NAME, NODE_ENV },
} = getConfig();

// The user, password, and database name can hold reserved URL characters
// such as "@", "/", "#", "%", "?", and ":". DB_HOST holds "host:port" and stays as is.
const encode = (value?: string) => encodeURIComponent(value || '');

const url = `postgresql://${encode(DB_USER)}:${encode(DB_PASS)}@${DB_HOST}/${encode(DB_NAME)}`;

// PrismaClient is attached to `global` in development so that hot reloads
// do not open a new connection pool each time.
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      NODE_ENV === 'production'
        ? ['warn', 'error']
        : ['query', 'warn', 'error'],
    datasources: { db: { url } },
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
