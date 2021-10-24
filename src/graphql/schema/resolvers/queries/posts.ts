import { Resolver, PostsPage } from '../../../generated/graphql';
import {fetchMostRecentVersion as fetchMostRecentPostsPageData} from '../postgresql/postsPage';

export const resolver: Resolver<PostsPage> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const data = await fetchMostRecentPostsPageData();

  return {
    summary: data?.summary,
    posts: data?.posts,
  };
};
