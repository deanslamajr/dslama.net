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
    summary: 'Thoughts, findings, and general experiences on web development',
    posts,
  };
};
