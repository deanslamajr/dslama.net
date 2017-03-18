import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import React from 'react';

import api from './api';
import renderComponent from './controllers/render-component';

import { getHashedPassword as getUsersHashedPassword } from './models/user';
import { verify as verifyJWT } from './models/jwt';

import constants from '../../config/constants';

const router = express.Router();

const ACCESSTOKENCOOKIE = constants.get('accessTokenCookie');
const SECRET = constants.get('secret');

router.use('/api', api);

router.post('/logout', (req, res) => {
  res.clearCookie(ACCESSTOKENCOOKIE, {});
  res.sendStatus(200);
});

router.post('/login', (req, res) => {
  getUsersHashedPassword(req.body.username)
    .then(response => {
      // username does not exist in DB
      if (!response) {
        return Promise.reject(418);
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, response, (error, result) => { 
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      })
    })
    .then(result => {
      // incorrect password
      if (result != true) {
        res.sendStatus(418);
        return;
      }

      // create JWT
      const accessToken = jwt.sign({
        // 3 hours
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
      }, SECRET);

      // set cookie to JWT
      res.cookie(ACCESSTOKENCOOKIE, accessToken, 
        { 
          // 3 hours
          expires: new Date(Date.now() + 1000 * 60 * 60 * 3), 
          httpOnly: true 
        });

      // send OK response
      res.sendStatus(200);
    })
    .catch(error => {
      let code;

      error === 418
        ? code = 418
        : code = 500;

      res.sendStatus(code);
    });
});

router.get('/authstatus', (req, res) => {
  verifyJWT(req)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(418);
    });
});

router.get('*', renderComponent);

export default router;