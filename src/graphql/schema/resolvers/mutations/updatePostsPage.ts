import {AuthenticationError} from 'apollo-server-micro';
import { Prisma } from '@prisma/client'

import { LinkInput, MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/postsPage';
import {ContextInterface} from '../../context';

export const resolver: Required<MutationResolvers<ContextInterface>>['updatePostsPage'] = async (
  _parent,
  {input},
  context,
  _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
    const updateArgs = {} as Prisma.PostsPageCreateInput;

    // Summary
    updateArgs.summary = input.summary;

    const data = await update(updateArgs);
  
    return {
      posts: data.posts,
      summary: data.summary
    };
  }

  throw new AuthenticationError('This action requires an authenticated account.');
};
