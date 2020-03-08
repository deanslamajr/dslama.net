import { PostsPayload, ResolverFn } from '../types/about.graphqls';

export const resolver: ResolverFn<PostsPayload, any, any, {}> = (
  _parent,
  _args,
  _context,
  _info
) => ({
  summary:
    'This is a list of blog posts authored by the developer. Most recently published posts are nearer the top.',
  posts: [
    {
      url: 'someUrl',
      originalPublishDate: 'someDate',
      title: 'titel',
      snippet: 'snippet!',
    },
  ],
});
