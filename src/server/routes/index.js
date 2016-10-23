import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import TestApp from '../../client/components/TestApp';

const router = express.Router();

router.get('*', (request, response) => {
  const markup = renderToString(<TestApp />);
  response.render('index', { markup } );
})

export default router;