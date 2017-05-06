/* eslint-env jest */
import { get } from './about'

import { get as getAbout } from '../models/about'

jest.mock('../models/about')

let req
let res

describe('api/about controller', () => {
  beforeEach(() => {
    req = {}
    res = {}
  })

  describe('#get', () => {
    beforeEach(() => {
      res.json = jest.fn()
      res.status = jest.fn()
      res.sendStatus = jest.fn()
    })

    it('returns about data', () => {
      const aboutData = [{ key: 'someStuff' }]
      getAbout.mockImplementationOnce(() => Promise.resolve(aboutData))

      const json = jest.fn()
      res.json = json
      const status = jest.fn()
      res.status = status

      return get(req, res)
        .then(() => {
          expect(json).toBeCalled()
          expect(json.mock.calls[0][0]).toBe(aboutData)
          expect(status.mock.calls[0][0]).toBe(200)
        })
    })

    describe('if an error occurs', () => {
      it('responds with a 500 status code', () => {
        getAbout.mockImplementationOnce(err => Promise.reject(err))

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
