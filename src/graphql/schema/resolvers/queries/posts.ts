import { Resolver, PostsPage } from '../../../generated/graphql';
import {fetchMostRecentVersion as fetchMostRecentPostsPageData} from '../postgresql/postsPage';

export const resolver: Resolver<PostsPage> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const data = await fetchMostRecentPostsPageData();
  const {
    summary = '',
    posts = []
  } = data || {};

  const sortedPosts = posts.sort((a, b) => (
    b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
  ));

  return {
    summary,
    posts: sortedPosts,
  };
};
