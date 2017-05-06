import uuid from 'uuid/v4'

import {
  get as getReadings,
  add as addReading } from '../models/readings'

function get (req, res) {
  return getReadings()
    .then(readings => {
      res.status(200)
      res.json(readings)
    })
    .catch(() => {
      // @todo log error
      res.sendStatus(500)
    })
}

function add (req, res) {
  // @todo validate against empty strings (on frontend too!)
  const readingData = {
    author: req.body.author,
    foundDate: (new Date()).getTime(),
    publishDate: req.body.publishDate,
    publication: req.body.publication,
    quote: req.body.quote,
    title: req.body.title,
    url: req.body.url,
    id: uuid()
  }

  return addReading(readingData)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => {
      res.sendStatus(500)
    })
}

export {
  get,
  add
}
