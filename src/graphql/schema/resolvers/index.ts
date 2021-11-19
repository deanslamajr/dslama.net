import { QueryResolvers, MutationResolvers } from '../../generated/graphql';

import { scalars } from './scalars';

import { resolver as aboutPageResolver } from './queries/about';
import { resolver as postsPageResolver } from './queries/posts';
import { resolver as projectsPageResolver } from './queries/projects';
import { resolver as readingsPageResolver } from './queries/readings';

import { resolver as attemptLoginResolver } from './mutations/attemptLogin';
import {resolver as updateAboutPageResolver } from './mutations/updateAboutPage';
import { resolver as updatePostsPageResolver } from './mutations/updatePostsPage';
import { resolver as updateProjectsPageResolver } from './mutations/updateProjectsPage';

const Query: Required<QueryResolvers> = {
  aboutPage: aboutPageResolver,
  postsPage: postsPageResolver,
  projectsPage: projectsPageResolver,
  readingsPage: readingsPageResolver
};

const Mutation: Required<MutationResolvers> = {
  attemptLogin: attemptLoginResolver,
  updateAboutPage: updateAboutPageResolver,
  updatePostsPage: updatePostsPageResolver,
  updateProjectsPage: updateProjectsPageResolver
}

export default { ...scalars, Mutation, Query };
