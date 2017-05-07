/* eslint-env jest */
import { isAuthenticated } from './status'

import { verify } from '../models/jwt'

jest.mock('../models/jwt')

let req
let res

describe('/status/authentication controller', () => {
  describe('#isAuthenticated', () => {
    beforeEach(() => {
      req = {}
      res = { sendStatus: jest.fn() }
    })

    it('should verify the associated JWT', () => {
      verify.mockClear()

      return isAuthenticated(req, res)
        .then(() => {
          expect(verify).toBeCalled()
          expect(verify.mock.calls[0][0]).toBe(req)
        })
    })

    it('should respond with OK status code', () => {
      const sendStatus = jest.fn()
      res.sendStatus = sendStatus

      return isAuthenticated(req, res)
        .then(() => {
          expect(sendStatus).toBeCalled()
          expect(sendStatus.mock.calls[0][0]).toBe(200)
        })
    })

    describe('if the JWT authentication fails', () => {
      it('should respond with a 418 status code', () => {
        verify.mockImplementationOnce(err => Promise.reject(err))

        const sendStatus = jest.fn()
        res.sendStatus = sendStatus

        return isAuthenticated(req, res)
          .then(() => {
            expect(sendStatus).toBeCalled()
            expect(sendStatus.mock.calls[0][0]).toBe(418)
          })
      })
    })
  })
})
