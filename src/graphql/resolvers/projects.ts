import {
  Resolver,
  ProjectsPayload,
  ResolversTypes,
} from '../types/projects.graphqls';
import { get as getProjects } from './models/projects';

export const resolver: Resolver<ResolversTypes['ProjectsPayload']> = async (
  _parent: any,
  _args: any,
  _context: any,
  _info: any
) => {
  const data = await getProjects();

  console.log('data', data);

  return {
    projects: [
      {
        id: 'fakeId',
        links: [],
        version: 'data?.version',
        pictureURL: 'data?.pictureURL',
        bio: 'data?.bio',
        title: 'data?.title',
      },
    ],
  };
};
