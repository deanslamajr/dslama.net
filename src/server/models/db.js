import awsDynamoDB from 'aws-dynamodb';

import constants from '../../../config/constants';

const dynamoDB = awsDynamoDB({
  accessKeyId: constants.get('DB_ACCESS_KEY_ID'), 
  secretAccessKey: constants.get('DB_SECRET_ACCESS_KEY'),
  region: constants.get('DB_REGION')
});

export default dynamoDB;