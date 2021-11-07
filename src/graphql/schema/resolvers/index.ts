import { QueryResolvers, MutationResolvers } from '../../generated/graphql';
import { resolver as projectsPageResolver } from './projects';
import { resolver as readingsPageResolver } from './readings';
import { resolver as aboutPageResolver } from './queries/about';
import { resolver as postsPageResolver } from './queries/posts';
import { resolver as attemptLoginResolver } from './mutations/attemptLogin';
import {resolver as updateAboutPageResolver } from './mutations/updateAboutPage';
import { resolver as updatePostsPageResolver } from './mutations/updatePostsPage';
import { scalars } from './scalars';

const Query: Required<QueryResolvers> = {
  aboutPage: aboutPageResolver,
  postsPage: postsPageResolver,
  projectsPage: projectsPageResolver,
  readingsPage: readingsPageResolver,
};

const Mutation: Required<MutationResolvers> = {
  attemptLogin: attemptLoginResolver,
  updateAboutPage: updateAboutPageResolver,
  updatePostsPage: updatePostsPageResolver
}

export default { ...scalars, Mutation, Query };
