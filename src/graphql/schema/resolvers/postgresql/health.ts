import { prisma } from '.';

export const pingDatabase = (): Promise<unknown> => prisma.$queryRaw`SELECT 1`;
