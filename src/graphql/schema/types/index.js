import rootTypes from './root.graphql';
import aboutTypes from './about.graphql';
import postsTypes from './posts.graphql';
import projectsTypes from './projects.graphql';
import readingsTypes from './readings.graphql';
import customScalarTypes from './scalars.graphql';

export const typeDefs = [
  rootTypes,
  customScalarTypes,
  aboutTypes,
  postsTypes,
  projectsTypes,
  readingsTypes,
];
