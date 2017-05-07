/* eslint-env jest */
import jwt from 'jsonwebtoken'

import { authenticateUser } from './login'
import { getHashedPassword } from '../models/user'
import constants from '../../../config/constants'

jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('../../../config/constants')
jest.mock('../models/user')
jest.mock('../helpers/metrics')

describe('/login controller', () => {
  describe('#authenticateUser', () => {
    let req
    let res

    beforeEach(() => {
      req = { body: {} }
      res = {
        cookie: jest.fn(),
        sendStatus: jest.fn()
      }
    })

    it('should set an access token JWT in the response cookies', () => {
      const cookie = jest.fn()
      res.cookie = cookie

      const jsonWebToken = { value: 'jwt.data' }

      jwt.sign.mockImplementationOnce(() => jsonWebToken)

      return authenticateUser(req, res)
        .then(() => {
          expect(cookie).toBeCalled()
          const params = cookie.mock.calls[0]
          expect(params[0]).toBe(constants.get('accessTokenCookie'))
          expect(params[1]).toBe(jsonWebToken)
          expect(params[2]).toMatchObject({ httpOnly: true })
        })
    })

    it('should respond with OK status code', () => {
      const sendStatus = jest.fn()
      res.sendStatus = sendStatus

      return authenticateUser(req, res)
        .then(() => {
          expect(sendStatus).toBeCalled()
          expect(sendStatus.mock.calls[0][0]).toBe(200)
        })
    })

    describe('if user creds don`t exist in DB', () => {
      it('should respond with 418 status code', () => {
        getHashedPassword.mockImplementationOnce(() => Promise.resolve(undefined))

        const sendStatus = jest.fn()
        res.sendStatus = sendStatus

        return authenticateUser(req, res)
          .then(() => {
            expect(sendStatus).toBeCalled()
            expect(sendStatus.mock.calls[0][0]).toBe(418)
          })
      })
    })

    describe('if an error occurs', () => {
      it('should respond with 500 status code', () => {
        jwt.sign.mockImplementationOnce(() => { throw new Error('Mocked JWT dependency throws a mock-error!') })

        const sendStatus = jest.fn()
        res.sendStatus = sendStatus

        return authenticateUser(req, res)
          .then(() => {
            expect(sendStatus).toBeCalled()
            expect(sendStatus.mock.calls[0][0]).toBe(500)
          })
      })
    })
  })
})
