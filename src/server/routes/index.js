import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from '../../client/components/routes';
import queryUsername from '../lib/queryUsername';

const router = express.Router();

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
      // create authToken
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error', error);
    });
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