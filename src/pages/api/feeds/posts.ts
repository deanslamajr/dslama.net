import { createFeedHandler } from '../../../feeds/atom';
import { fetchMostRecentVersion } from '../../../graphql/schema/resolvers/postgresql/postsPage';

export default createFeedHandler({
  title: 'dslama.net posts',
  path: '/api/feeds/posts',
  pagePath: '/posts',
  load: async () => {
    const page = await fetchMostRecentVersion();
    return (
      page && {
        updated: page.createdAt,
        entries: page.posts.map(post => ({
          title: post.title,
          url: post.url,
          updated: post.originalPublishDate,
          summary: post.snippet,
        })),
      }
    );
  },
});
