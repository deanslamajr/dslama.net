import DynamodbFactory from '@awspilot/dynamodb';
import getConfig from 'next/config';

// @TODO type this file after converting to redis

const { serverRuntimeConfig } = getConfig();

const dynamoDB = DynamodbFactory({
  accessKeyId: serverRuntimeConfig.DYNAMO_ACCESS_KEY_ID,
  secretAccessKey: serverRuntimeConfig.DYNAMO_SECRET_ACCESS_KEY,
  region: serverRuntimeConfig.DYNAMO_REGION,
});

export default dynamoDB;
