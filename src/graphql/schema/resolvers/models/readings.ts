import getConfig from 'next/config';

import db from './db';
import { Reading } from '../../../generated/graphql';

const { serverRuntimeConfig } = getConfig();

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

export const get: () => Promise<Reading[]> = async () => {
  const rawReadings: RawReading[] = await db
    .table(serverRuntimeConfig.DYNAMO_TABLE_READINGS)
    .scan();

  return rawReadings
    .map(transformRawReading)
    .sort((a, b) => b.foundDate - a.foundDate);
};
