import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from '../../client/components/routes';
import queryUsername from '../lib/queryUsername';

const router = express.Router();

const ACCESSTOKEN = 'accessToken';

router.post('/login', (req, res) => {
  queryUsername(req.body.username)
    .then(response => {
      // username does not exist in DB
      if (!response) {
        res.sendStatus(418);
        return;
      }
      // incorrect password
      if (req.body.password !== response.password) {
        res.sendStatus(418);
        return;
      }
      // create JWT
      // set cookie to JWT
      res.cookie(ACCESSTOKEN, 'JWT', 
        { 
          // 10 second expiration !!TESTING ONLY!!
          expires: new Date(Date.now() + 1000 * 10), 
          httpOnly: true 
        });
      // send OK response
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error', error);
      res.sendStatus(500);
    });
});

router.get('/authenticationCheck', (req, res) => {
  // @todo: after JWT logic is completed, 
  // change this to verify JWT is valid
  const hasAuthentication = req.cookies[ACCESSTOKEN];

  let code;

  hasAuthentication
    ? code = 200
    : code = 418;

  res.sendStatus(code);
});

router.get('*', (req, res) => {
  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res
        .status(500)
        .send(error.message);
    } 
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } 
    else if (renderProps) {
      const markup = renderToString(<RouterContext {...renderProps} />);
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
  });
});

export default router;