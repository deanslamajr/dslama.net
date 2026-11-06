import { QueryResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { fetchMostRecentVersion } from '../postgresql/projectsPage';

export const resolver: Required<
  QueryResolvers<ContextInterface>
>['projectsPage'] = async () => {
  const data = await fetchMostRecentVersion();
  const projects = data?.projects ?? [];

  return {
    summary: data?.summary ?? '',
    projects: projects.sort(
      (a, b) =>
        b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
    ),
  };
};
