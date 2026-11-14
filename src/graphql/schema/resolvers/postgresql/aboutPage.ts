import { Prisma } from '@prisma/client';
import { prisma } from '.';
import { versionedPage } from './versionedPage';

const page = versionedPage<
  Prisma.AboutPageGetPayload<{ include: { links: true } }>,
  Prisma.AboutPageCreateInput
>(prisma.aboutPage, { links: true });

export const fetchMostRecentVersion = page.fetchNewest;
export const update = page.createVersion;
