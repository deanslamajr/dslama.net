import { Prisma } from '@prisma/client';
import { prisma } from '.';
import { versionedPage } from './versionedPage';

const page = versionedPage<
  Prisma.ProjectsPageGetPayload<{ include: { projects: true } }>,
  Prisma.ProjectsPageCreateInput
>(prisma.projectsPage, { projects: true });

export const fetchMostRecentVersion = page.fetchNewest;
export const update = page.createVersion;
export const fetchVersion = page.fetchVersion;
export const listVersions = page.listVersions;
