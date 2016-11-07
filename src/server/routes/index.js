import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from '../../client/components/routes'
import queryUsername from '../lib/queryUsername';

const router = express.Router();

router.post('/login', (req, res) => {
  queryUsername(req.body.username)
    .then(response => {
      console.log('response', response);
      // username does not exist
      if (!response) {

      }
      // verify that password matches
    })
    .catch(error => {
      console.log('error', error);
    });
})

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
      res
        .status(404)
        .send('Not found');
    }
  });
});

export default router;