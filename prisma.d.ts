import { PrismaClient } from '@prisma/client';

declare global {
  // `var` is the only way to add a property to globalThis in a declaration.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
