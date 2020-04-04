import rootTypes from './root.graphqls';
import aboutTypes from './about.graphqls';
import postsTypes from './posts.graphqls';
import projectsTypes from './projects.graphqls';
import readingsTypes from './readings.graphqls';
import customScalarTypes from './scalars.graphqls';

export const typeDefs = [
  rootTypes,
  customScalarTypes,
  aboutTypes,
  postsTypes,
  projectsTypes,
  readingsTypes,
];
