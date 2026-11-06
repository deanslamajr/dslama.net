import { QueryResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { fetchMostRecentVersion } from '../postgresql/aboutPage';

export const resolver: Required<
  QueryResolvers<ContextInterface>
>['aboutPage'] = async () => {
  const data = await fetchMostRecentVersion();

  return {
    links: data?.links ?? [],
    version: data?.version ?? 0,
    pictureURL: data?.pictureURL ?? '',
    bio: data?.bio ?? '',
    title: data?.title ?? '',
  };
};
