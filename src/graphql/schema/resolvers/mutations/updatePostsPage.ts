import { Prisma } from '@prisma/client';

import {
  MutationResolvers,
  UpdatePostsPageInput,
} from '../../../generated/graphql';
import { update } from '../postgresql/postsPage';
import { ContextInterface } from '../../context';
import { requireActiveAccount } from '../../auth';
import { HTTP_PROTOCOLS, LIMITS } from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeUrl,
} from '../../validation';

// Validates a save. A restore of an old version runs through it too.
export const toCreateInput = (
  input: UpdatePostsPageInput
): Prisma.PostsPageCreateInput => {
  const updateArgs = {} as Prisma.PostsPageCreateInput;

  // Summary
  updateArgs.summary = assertMaxLength(
    input.summary,
    LIMITS.longText,
    'summary'
  );

  // Posts
  const posts = assertMaxItems(input.posts, 'posts').map((post, index) => ({
    originalPublishDate: post.originalPublishDate,
    title: assertMaxLength(
      post.title,
      LIMITS.shortText,
      `posts[${index}].title`
    ),
    snippet: assertMaxLength(
      post.snippet,
      LIMITS.longText,
      `posts[${index}].snippet`
    ),
    url: normalizeUrl(post.url, `posts[${index}].url`, HTTP_PROTOCOLS),
  }));
  if (posts.length) {
    updateArgs.posts = {
      create: posts,
    };
  }

  return updateArgs;
};

export const resolver: Required<
  MutationResolvers<ContextInterface>
>['updatePostsPage'] = async (_parent, { input }, context, _info) => {
  await requireActiveAccount(context);

  const data = await update(toCreateInput(input));
  const sortedPosts = data.posts.sort(
    (a, b) => b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
  );

  return {
    posts: sortedPosts,
    summary: data.summary,
  };
};
