import { Resolver, ProjectsPage } from '../../../generated/graphql';
import {fetchMostRecentVersion as fetchMostRecentProjectsPageData} from '../postgresql/projectsPage';

export const resolver: Resolver<ProjectsPage> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const data = await fetchMostRecentProjectsPageData() || {} as NonNullable<Awaited<ReturnType<typeof fetchMostRecentProjectsPageData>>>;
  const summary = data.summary || ''
  const projects = data.projects || [];

  const sortedProjects = projects.sort((a, b) => (
    b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
  ));

  return {
    summary,
    projects: sortedProjects,
  };
};
