/* eslint-env jest */
import { get } from './posts'

import { get as getPosts } from '../models/posts'

jest.mock('../models/posts')

let req
let res

describe('api/posts controller', () => {
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

    it('returns a list of posts', () => {
      const posts = [{ name: 'somePost' }]
      getPosts.mockImplementationOnce(() => Promise.resolve(posts))

      const json = jest.fn()
      res.json = json
      const status = jest.fn()
      res.status = status

      return get(req, res)
        .then(() => {
          expect(json).toBeCalled()
          expect(json.mock.calls[0][0]).toBe(posts)
          expect(status.mock.calls[0][0]).toBe(200)
        })
    })

    describe('if an error occurs', () => {
      it('responds with a 500 status code', () => {
        getPosts.mockImplementationOnce(err => Promise.reject(err))

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
