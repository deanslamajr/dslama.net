import { QueryResolvers, MutationResolvers } from '../../generated/graphql';
import { resolver as aboutPageResolver } from './about';
import { resolver as postsPageResolver } from './posts';
import { resolver as projectsPageResolver } from './projects';
import { resolver as readingsPageResolver } from './readings';
import {resolver as updateAboutPageResolver } from './mutations/updateAboutPage';
import { scalars } from './scalars';

const Query: Required<QueryResolvers> = {
  aboutPage: aboutPageResolver,
  postsPage: postsPageResolver,
  projectsPage: projectsPageResolver,
  readingsPage: readingsPageResolver,
};

const Mutation: Required<MutationResolvers> = {
  updateAboutPage: updateAboutPageResolver
}

export default { ...scalars, Mutation, Query };
