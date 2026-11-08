import { createFeedHandler } from '../../../feeds/atom';
import { fetchMostRecentVersion } from '../../../graphql/schema/resolvers/postgresql/readingsPage';

export default createFeedHandler({
  title: 'dslama.net readings',
  path: '/api/feeds/readings',
  pagePath: '/readings',
  load: async () => {
    const page = await fetchMostRecentVersion();
    return (
      page && {
        updated: page.createdAt,
        entries: page.readings.map(reading => ({
          title: reading.title,
          url: reading.url,
          updated: reading.foundDate,
          summary: reading.quote,
        })),
      }
    );
  },
});
