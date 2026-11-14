import { Prisma } from '@prisma/client';
import { prisma } from '.';
import { versionedPage } from './versionedPage';

const page = versionedPage<
  Prisma.ReadingsPageGetPayload<{ include: { readings: true } }>,
  Prisma.ReadingsPageCreateInput
>(prisma.readingsPage, { readings: true });

export const fetchMostRecentVersion = page.fetchNewest;
export const update = page.createVersion;
