import jwt from 'jsonwebtoken';

import constants from '../../../config/constants';

const ACCESSTOKENCOOKIE = constants.get('accessTokenCookie');
const SECRET = constants.get('secret');

export const verify = (req) => {
  return new Promise((resolve, reject) => {
    const jWT = req.cookies[ACCESSTOKENCOOKIE];

    if (!jWT) {
      reject('JWT is invalid!');
    }
    else {
      try {
        jwt.verify(jWT, SECRET);
        resolve();
      } 
      catch(err) {
        reject(err);
      }
    }
  });
}