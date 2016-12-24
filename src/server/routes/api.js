import express from 'express';
import uuid from 'uuid/v4';

import { addSnippet } from '../lib/db';

const router = express.Router();

router.get('/snippets', (req, res) => {
  console.log('taco nachos');
  res.sendStatus(200);
});

router.post('/snippets', (req, res) => {
  // convert image via tinypng
  // upload to s3

  // need to validate against empty strings (on frontend too!)
  const snippetData = {
    author: req.body.author,
    foundDate: (new Date).getTime(),
    publishDate: req.body.publishDate,
    publication: req.body.publication,
    quote: req.body.quote,
    title: req.body.title,
    url: req.body.url,
    imagePath: req.body.imagePath,
    id: uuid()
  };

  addSnippet(snippetData)
    .then(() => {
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

export default router;