import dynamodb from 'dynamodb';

import constants from '../../../config/constants';

const db = dynamodb.ddb({ 
  accessKeyId: constants.get('accessKeyId'), 
  secretAccessKey: constants.get('secretAccessKey'),
  endpoint: constants.get('endpoint')
});

export const addReading = (data) => {
  return new Promise((resolve, reject) => {
    db.putItem(constants.get('snippetsTable'), data, {}, (err, res, cap) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
};

export const getReadings = () => {
  return new Promise((resolve, reject) => {
    db.scan(constants.get('snippetsTable'), {}, (err, res) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve(res.items);
      }
    });
  });
}

export default (username) => {
  // need to sanitize 'username' so that HTTP header injection doesn't occur in dynamodb library
  username = username.replace(/:/g,'');

  return new Promise((resolve, reject) => {
    db.getItem(constants.get('loginTable'), username, null, {}, (err, res, cap) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};