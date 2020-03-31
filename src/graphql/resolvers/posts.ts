import { Resolver, ResolversTypes } from '../types/posts.graphqls';
import { get as getPosts } from './models/posts';

export const resolver: Resolver<ResolversTypes['PostsPayload']> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const posts = await getPosts();

  return {
    // @TODO move this to the DB
    summary:
      'This is a list of blog posts authored by the developer. Most recently published posts are nearer the top.',
    posts,
  };
};
