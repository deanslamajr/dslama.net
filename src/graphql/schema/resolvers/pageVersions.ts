import { PageType } from '../../generated/graphql';
import * as aboutPage from './postgresql/aboutPage';
import * as postsPage from './postgresql/postsPage';
import * as projectsPage from './postgresql/projectsPage';
import * as readingsPage from './postgresql/readingsPage';
import { VersionSummary } from './postgresql/versionedPage';
import { toCreateInput as aboutToCreateInput } from './mutations/updateAboutPage';
import { toCreateInput as postsToCreateInput } from './mutations/updatePostsPage';
import { toCreateInput as projectsToCreateInput } from './mutations/updateProjectsPage';
import { toCreateInput as readingsToCreateInput } from './mutations/updateReadingsPage';

// The history panel lists this many versions, newest first.
export const VERSION_LIST_LIMIT = 20;

type StoredPage = Record<string, unknown> & VersionSummary;

type PageVersions = {
  listVersions: (take: number) => Promise<VersionSummary[]>;
  fetchVersion: (version: number) => Promise<StoredPage | null>;
  // Validates the old content as a save would, then stores it as a new version.
  restore: (input: Record<string, unknown>) => Promise<VersionSummary>;
};

export const pages: Record<PageType, PageVersions> = {
  ABOUT: {
    listVersions: aboutPage.listVersions,
    fetchVersion: aboutPage.fetchVersion,
    restore: input => aboutPage.update(aboutToCreateInput(input as never)),
  },
  POSTS: {
    listVersions: postsPage.listVersions,
    fetchVersion: postsPage.fetchVersion,
    restore: input => postsPage.update(postsToCreateInput(input as never)),
  },
  PROJECTS: {
    listVersions: projectsPage.listVersions,
    fetchVersion: projectsPage.fetchVersion,
    restore: input =>
      projectsPage.update(projectsToCreateInput(input as never)),
  },
  READINGS: {
    listVersions: readingsPage.listVersions,
    fetchVersion: readingsPage.fetchVersion,
    restore: input =>
      readingsPage.update(readingsToCreateInput(input as never)),
  },
};

const PAGE_META_FIELDS = ['version', 'createdAt', 'updatedAt'];

// A stored page has the same field names as its save input, plus row
// metadata. Drop the metadata from the page and from each child row.
export const toSaveInput = (page: StoredPage): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(page)
      .filter(([key]) => !PAGE_META_FIELDS.includes(key))
      .map(([key, value]) => [
        key,
        Array.isArray(value)
          ? value.map(
              ({
                id: _id,
                pageVersionThatReference: _version,
                ...rest
              }: Record<string, unknown>) => rest
            )
          : value,
      ])
  );
