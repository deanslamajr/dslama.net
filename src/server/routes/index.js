import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import api from './api';
import routes from '../../client/components/routes';
import queryUsername from '../lib/db';
import { verifyJWT } from '../lib/util';

import constants from '../../../config/constants';

const router = express.Router();

const ACCESSTOKENCOOKIE = constants.get('accessTokenCookie');
const SECRET = constants.get('secret');

router.use('/api', api);

router.post('/logout', (req, res) => {
  res.clearCookie(ACCESSTOKENCOOKIE, {});
  res.sendStatus(200);
});

router.post('/login', (req, res) => {
  queryUsername(req.body.username)
    .then(response => {
      // username does not exist in DB
      if (!response) {
        return Promise.reject(418);
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, response.password, (error, result) => { 
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

router.get('*', (req, res) => {
  matchRoutes(routes, req)
    .then(({ redirect, props, data }) => {
      if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } 
      else if (props) {
        const markup = renderToString(
          <RouterContext
            {...props}
            createElement={(Component, props) => {
                return <Component taco={ data } {...props} />;
            }}
          />
        );
        
        res
          .status(200)
          .render('index', { markup });
      } 
      else {
        // @todo: replace with 302 redirect to /404
        res
          .status(404)
          .send('Not found');
      }
    })
    .catch(error => {
      res
        .status(500)
        .send(error.message);
    });
});

/**
  * Perform server-side async data fetching in this function (according to path)
  **/
function matchRoutes(routes, req) {
  const { originalUrl: location } = req;

  return new Promise((resolve, reject) => {
    match({ routes, location }, (err, redirect, props) => {
      if (err) reject(err);
      else {
        // handle endpoints that require server-side async
        switch(location) {
          case '/readings/add':
            verifyJWT(req)
              .then(() => {
                // send data to app store to signify this check has already occured
                const mockData = 'taco';
                // remove the redirect for this isAuthenticated case i.e. the client should be able to pass through
                resolve({ props, data: mockData })
              })
              .catch(() => resolve({ redirect: { pathname: '/', search: '' }, props }));
            break;
          default:
            resolve({ redirect, props });
        }        
      }
    });
  });
}

export default router;