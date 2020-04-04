import {
  Resolver,
  ResolverTypeWrapper,
  Reading,
  ReadingsPage,
} from '../types/readings.graphqls';
import { get as getReadings } from './models/readings';

interface RawReading {
  id: string;
  foundDate: number;
  publication: string;
  publishDate: number;
  url: string;
  quote: string;
  author: string;
  title: string;
}

const transformRawReading: (rawReading: RawReading) => Reading = rawReading => {
  const foundDate = rawReading?.foundDate
    ? new Date(rawReading.foundDate)
    : null;

  const publishDate = rawReading?.publishDate
    ? new Date(rawReading?.publishDate)
    : null;

  return {
    id: rawReading?.id,
    author: rawReading?.author,
    foundDate,
    publication: rawReading?.publication,
    publishDate,
    quote: rawReading?.quote,
    title: rawReading?.title,
    url: rawReading?.url,
  };
};

export const resolver: Resolver<ResolverTypeWrapper<ReadingsPage>> = async (
  _parent: any,
  _args: any,
  _context: any,
  _info: any
) => {
  const rawReadings: RawReading[] = await getReadings();

  const readings: Reading[] = rawReadings
    .map(transformRawReading)
    .sort((a, b) => b.foundDate - a.foundDate);

  return {
    readings,
    // @TODO move this to the DB
    summary:
      'Possibly helpful, possibly insightful, and/or possibly interesting write-ups on all things web development.',
  };
};
