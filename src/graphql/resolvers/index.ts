import { QueryResolvers } from '../types/root.graphqls';
import { resolver as aboutPageResolver } from './about';
import { resolver as postsPageResolver } from './posts';
import { resolver as projectsPageResolver } from './projects';
import { resolver as readingsPageResolver } from './readings';
import { scalars } from './scalars';

const Query: Required<QueryResolvers> = {
  aboutPage: aboutPageResolver,
  postsPage: postsPageResolver,
  projectsPage: projectsPageResolver,
  readingsPage: readingsPageResolver,
};

export default { ...scalars, Query };
