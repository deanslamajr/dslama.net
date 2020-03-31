import getConfig from 'next/config';

import db from './db';

// @TODO type this file after converting to redis

const { serverRuntimeConfig } = getConfig();

export const get = () => {
  return db
    .table(serverRuntimeConfig.DYNAMO_TABLE_PROJECTS)
    .scan()
    .then(response => {
      console.log('response', response);
      return response;
    });
};
