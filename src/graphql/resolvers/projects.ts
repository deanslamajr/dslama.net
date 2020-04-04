import { Resolver, ProjectsPage } from '../types/projects.graphqls';
import { get as getProjects } from './models/projects';

export const resolver: Resolver<ProjectsPage> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const rawProjects = await getProjects();

  return {
    projects: rawProjects,
    // @TODO move this to the DB
    summary: 'Cool, handbuilt webapps. Click on a title to start one up.',
  };
};
