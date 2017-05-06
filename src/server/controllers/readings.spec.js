/* eslint-env jest */
import { get, add } from './readings'

import {
  get as getReadings,
  add as addReading } from '../models/readings'

jest.mock('../models/readings')

let req
let res

describe('api/readings controller', () => {
  beforeEach(() => {
    req = {}
    res = { sendStatus: jest.fn() }
  })

  describe('#add', () => {
    const author = 'author'
    const publishDate = 12345
    const publication = 'publication'
    const quote = 'quote'
    const title = 'title'
    const url = 'url'
    const body = {
      author,
      publishDate,
      publication,
      quote,
      title,
      url
    }

    beforeEach(() => {
      req.body = body
    })

    it('creates a new `reading` from data on the request', () => {
      addReading.mockImplementationOnce(() => Promise.resolve())

      return add(req, res)
        .then(() => {
          expect(addReading).toBeCalled()
          expect(addReading.mock.calls[0][0]).toEqual(expect.objectContaining(body))
        })
    })

    it('responds with OK status code', () => {
      addReading.mockImplementationOnce(() => Promise.resolve())

      const sendStatus = jest.fn()
      res.sendStatus = sendStatus

      return add(req, res)
        .then(() => {
          expect(sendStatus).toBeCalled()
          expect(sendStatus.mock.calls[0][0]).toBe(200)
        })
    })

    describe('if an error occurs', () => {
      it('responds with a 500 status code', () => {
        addReading.mockImplementationOnce(error => Promise.reject(error))

        const sendStatus = jest.fn()
        res.sendStatus = sendStatus

        return add(req, res)
          .then(() => {
            expect(sendStatus).toBeCalled()
            expect(sendStatus.mock.calls[0][0]).toBe(500)
          })
      })
    })
  })

  describe('#get', () => {
    beforeEach(() => {
      res.json = jest.fn()
      res.status = jest.fn()
    })

    it('returns about data', () => {
      const readings = [{ title: 'somePost' }]
      getReadings.mockImplementationOnce(() => Promise.resolve(readings))

      const json = jest.fn()
      res.json = json
      const status = jest.fn()
      res.status = status

      return get(req, res)
        .then(() => {
          expect(json).toBeCalled()
          expect(json.mock.calls[0][0]).toBe(readings)
          expect(status.mock.calls[0][0]).toBe(200)
        })
    })

    describe('if an error occurs', () => {
      it('responds with a 500 status code', () => {
        getReadings.mockImplementationOnce(err => Promise.reject(err))

        const sendStatus = jest.fn()
        res.sendStatus = sendStatus

        return get(req, res)
          .then(() => {
            expect(sendStatus).toBeCalled()
            expect(sendStatus.mock.calls[0][0]).toBe(500)
          })
      })
    })
  })
})
