/* eslint-env jest */
import { logout } from './logout'

import constants from '../../../config/constants'

jest.mock('../../../config/constants')

const ACCESSTOKENCOOKIE = constants.get('accessTokenCookie')

describe('/logout controller', () => {
  describe('#logout', () => {
    let req
    let res

    beforeEach(() => {
      req = {}
      res = {
        clearCookie: jest.fn(),
        sendStatus: jest.fn()
      }
    })

    it('should clear the ACCESS cookie', () => {
      const clearCookie = jest.fn()
      res.clearCookie = clearCookie

      logout(req, res)

      expect(clearCookie).toBeCalled()
      expect(clearCookie.mock.calls[0][0]).toBe(ACCESSTOKENCOOKIE)
    })

    it('should send OK response', () => {
      const sendStatus = jest.fn()
      res.sendStatus = sendStatus

      logout(req, res)

      expect(sendStatus).toBeCalled()
      expect(sendStatus.mock.calls[0][0]).toBe(200)
    })
  })
})
