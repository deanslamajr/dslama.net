import express from 'express';
import uuid from 'uuid/v4';

import { addReading, getReadings } from './models/db';

const router = express.Router();

router.get('/readings', (req, res) => {
  getReadings()
    .then(readings => {
      res.status(200).json(readings);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.post('/readings', (req, res) => {
  // need to validate against empty strings (on frontend too!)
  const readingData = {
    author: req.body.author,
    foundDate: (new Date).getTime(),
    publishDate: req.body.publishDate,
    publication: req.body.publication,
    quote: req.body.quote,
    title: req.body.title,
    url: req.body.url,
    id: uuid()
  };

  addReading(readingData)
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