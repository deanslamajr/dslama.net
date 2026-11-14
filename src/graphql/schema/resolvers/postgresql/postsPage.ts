import { Prisma } from '@prisma/client';
import { prisma } from '.';
import { versionedPage } from './versionedPage';

const page = versionedPage<
  Prisma.PostsPageGetPayload<{ include: { posts: true } }>,
  Prisma.PostsPageCreateInput
>(prisma.postsPage, { posts: true });

export const fetchMostRecentVersion = page.fetchNewest;
export const update = page.createVersion;
export const fetchVersion = page.fetchVersion;
export const listVersions = page.listVersions;
