import { PrismaClient } from '@prisma/client';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { DB_USER, DB_PASS, DB_HOST, DB_NAME },
} = getConfig();

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
    // If the dotenv-expand AND/OR concatonating env vars in the DATABASE_URL env var declaration
    // in deployments/clusters/2025-GKE/dslama.net/app.yaml doesn't work, comment out below and then
    // set url (line 6) in prisma/schema.prisma to empty string.
    // This should work for running the app but will break npm run migrate & npm run studio
    // 
    // datasources: {
    //   db: {
    //     url: `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
    //   },
    // },
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
