/* eslint-env jest */
import { get } from './projects'

import { get as getProjects } from '../models/projects'

jest.mock('../models/projects')

let req
let res

describe('api/projects controllers', () => {
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

    it('returns a list of projects', () => {
      const projects = [{ name: 'someProject' }]
      getProjects.mockImplementationOnce(() => Promise.resolve(projects))

      const json = jest.fn()
      res.json = json
      const status = jest.fn()
      res.status = status

      return get(req, res)
        .then(() => {
          expect(json).toBeCalled()
          expect(status.mock.calls[0][0]).toBe(200)
          expect(json.mock.calls[0][0]).toBe(projects)
        })
    })

    describe('if an error occurs', () => {
      it('responds with a 500 status code', () => {
        getProjects.mockImplementationOnce(err => Promise.reject(err))

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
