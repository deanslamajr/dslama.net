import nconf from 'nconf';

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from '../../client/components/routes';
import queryUsername from '../lib/queryUsername';

const constants = nconf.file(`${__dirname}/../config/constants.json`);

const router = express.Router();

const ACCESSTOKENCOOKIE = 'jeer';
const SECRET = constants.get('secret');

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

router.get('/authenticationCheck', (req, res) => {
  let status;

  const jWT = req.cookies[ACCESSTOKENCOOKIE];

  if (!jWT) {
    status = 418;
  }
  else {
    try {
      jwt.verify(jWT, SECRET);
      status = 200;
    } 
    catch(err) {
      status = 418;
    }
  }

  res.sendStatus(status);
});

router.get('*', (req, res) => {
  matchRoutes(routes, req.originalUrl)
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
function matchRoutes(routes, location) {
  return new Promise((resolve, reject) => {
    match({ routes, location }, (err, redirect, props) => {
      if (err) reject(err);
      else {
        // Make async request here
        // return data in resolve
        const mockData = 'taco'
        resolve({ redirect, props, data: mockData });
      }
    });
  });
}

export default router;