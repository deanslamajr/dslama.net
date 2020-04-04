import { QueryResolvers } from '../types/root.graphqls';
import { resolver as homeMainResolver } from './home';
import { resolver as postsResolver } from './posts';
import { resolver as projectsResolver } from './projects';
import { resolver as readingsPageResolver } from './readings';
import { scalars } from './scalars';

const Query: Required<QueryResolvers> = {
  homeQuery: homeMainResolver,
  postsQuery: postsResolver,
  getProjects: projectsResolver,
  readingsPage: readingsPageResolver,
};

export default { ...scalars, Query };
