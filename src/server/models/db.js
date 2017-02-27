import awsDynamoDB from 'aws-dynamodb';

import constants from '../../../config/constants';

const dynamoDB = awsDynamoDB({
  accessKeyId: constants.get('DB_ACCESS_KEY_ID'), 
  secretAccessKey: constants.get('DB_SECRET_ACCESS_KEY'),
  region: constants.get('DB_REGION')
});

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

function verifyResponse(res) {
  if (!Array.isArray(res)) {
    throw new Error('DB response was not the expected type: Array');
  }
  if (!res.length) {
    throw new Error('DB returned an empty array.');
  }
}

export const getAbout = () => {
  return dynamoDB
    .table(constants.get('DB_TABLE_ABOUT'))
    .scan()
    .then(res => {
      verifyResponse(res);
      // return the most recent version
      return reverseSortResponseByVersion(res)[0];
    });
};

export const getReadings = () => {
  return dynamoDB
    .table(constants.get('DB_TABLE_READINGS'))
    .scan()
    .then(res => {
      verifyResponse(res);
      return res;
    });
};

export const verifyUsername = (username) => {
  return dynamoDB
    .table(constants.get('DB_TABLE_USERS'))
    .where('name').eq(username)
    .get()
    .then(res => {
      return res && res.password
        ? res.password
        : null;
    });
};

export const addReading = (data) => {
  return dynamoDB
    .table(constants.get('DB_TABLE_READINGS'))
    .insert(data);
};