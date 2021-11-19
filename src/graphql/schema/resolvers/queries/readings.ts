import { Resolver, ReadingsPage } from '../../../generated/graphql';
import {fetchMostRecentVersion as fetchMostRecentReadingsPageData} from '../postgresql/readingsPage';

export const resolver: Resolver<ReadingsPage> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const data = await fetchMostRecentReadingsPageData() || {} as NonNullable<Awaited<ReturnType<typeof fetchMostRecentReadingsPageData>>>;
  const summary = data.summary || ''
  const readings = data.readings || [];

  const sortedReadings = readings.sort((a, b) => (
    b.foundDate.getTime() - a.foundDate.getTime()
  ));

  return {
    summary,
    readings: sortedReadings,
  };
};
