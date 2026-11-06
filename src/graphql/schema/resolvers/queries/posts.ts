import { QueryResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { fetchMostRecentVersion } from '../postgresql/postsPage';

export const resolver: Required<
  QueryResolvers<ContextInterface>
>['postsPage'] = async () => {
  const data = await fetchMostRecentVersion();
  const posts = data?.posts ?? [];

  return {
    summary: data?.summary ?? '',
    posts: posts.sort(
      (a, b) =>
        b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
    ),
  };
};
