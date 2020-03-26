import rootTypes from './root.graphqls';
import homeTypes from './home.graphqls';
import postsTypes from './posts.graphqls';
import customScalarTypes from './scalars.graphqls';

export const typeDefs = [rootTypes, customScalarTypes, homeTypes, postsTypes];
