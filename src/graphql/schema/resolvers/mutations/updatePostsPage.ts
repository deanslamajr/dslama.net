import { Prisma } from '@prisma/client'

import { MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/postsPage';
import {ContextInterface} from '../../context';
import { requireActiveAccount } from '../../auth';
import { HTTP_PROTOCOLS, LIMITS } from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeUrl,
} from '../../validation';

export const resolver: Required<MutationResolvers<ContextInterface>>['updatePostsPage'] = async (
  _parent,
  {input},
  context,
  _info
) => {

  await requireActiveAccount(context);

  const updateArgs = {} as Prisma.PostsPageCreateInput;

  // Summary
  updateArgs.summary = assertMaxLength(input.summary, LIMITS.longText, 'summary');

  // Posts
  const posts = assertMaxItems(input.posts, 'posts').map((post, index) => ({
    originalPublishDate: post.originalPublishDate,
    title: assertMaxLength(post.title, LIMITS.shortText, `posts[${index}].title`),
    snippet: assertMaxLength(post.snippet, LIMITS.longText, `posts[${index}].snippet`),
    url: normalizeUrl(post.url, `posts[${index}].url`, HTTP_PROTOCOLS),
  }));
  if (posts.length) {
    updateArgs.posts = {
      create: posts
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
};
