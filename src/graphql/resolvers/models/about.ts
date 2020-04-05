import getConfig from 'next/config';

import db from './db';
import { AboutPage } from '../../types/projects.graphqls';

const { serverRuntimeConfig } = getConfig();

const reverseSortResponseByVersion: (
  unsortedAboutPageData: AboutPage[]
) => AboutPage[] = unsortedAboutPageData => {
  return unsortedAboutPageData.sort((a, b) => {
    // if either item does not have a valid version property, sort that item as less important
    if (!a.version || !Number.isInteger(a.version)) {
      return 1;
    }
    if (!b.version || !Number.isInteger(b.version)) {
      return -1;
    }
    return b.version - a.version;
  });
};

export const get: () => Promise<AboutPage> = async () => {
  const rawAboutPageData: AboutPage[] = await db
    .table(serverRuntimeConfig.DYNAMO_TABLE_ABOUT)
    .scan();

  return reverseSortResponseByVersion(rawAboutPageData)[0];
};
