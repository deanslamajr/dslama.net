import getConfig from 'next/config';

import db from './db';

// @TODO type this file after converting to redis

const { serverRuntimeConfig } = getConfig();

function reverseSortResponseByVersion(res) {
  return res.sort((a, b) => {
    // if either item does not have a valid version property, sort that item as less important
    if (!a.version || !Number.isInteger(a.version)) {
      return 1;
    }
    if (!b.version || !Number.isInteger(b.version)) {
      return -1;
    }
    return b.version - a.version;
  });
}

export const get = () => {
  return db
    .table(serverRuntimeConfig.DYNAMO_TABLE_ABOUT)
    .scan()
    .then(res => {
      return reverseSortResponseByVersion(res)[0];
    });
};
