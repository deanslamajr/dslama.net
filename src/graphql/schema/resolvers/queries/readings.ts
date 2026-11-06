import { QueryResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { fetchMostRecentVersion } from '../postgresql/readingsPage';

export const resolver: Required<
  QueryResolvers<ContextInterface>
>['readingsPage'] = async () => {
  const data = await fetchMostRecentVersion();
  const readings = data?.readings ?? [];

  return {
    summary: data?.summary ?? '',
    readings: readings.sort(
      (a, b) => b.foundDate.getTime() - a.foundDate.getTime()
    ),
  };
};
