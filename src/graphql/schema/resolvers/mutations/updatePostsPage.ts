import {AuthenticationError} from 'apollo-server-micro';
import { Prisma } from '@prisma/client'

import { LinkInput, MutationResolvers, PostInput } from '../../../generated/graphql';
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

    // Posts
    if (input.posts.length) {
      updateArgs.posts = {
        create: [...input.posts]
      };
    }

    const data = await update(updateArgs);
    const sortedPosts = data.posts.sort(
      (a, b) => b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
    );
  
    return {
      posts: sortedPosts,
      summary: data.summary
    };
  }

  throw new AuthenticationError('This action requires an authenticated account.');
};
