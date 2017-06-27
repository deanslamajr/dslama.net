import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { getHashedPassword as getUsersHashedPassword } from '../models/user'
import { increment, time } from '../helpers/metrics'
import constants from '../../../config/constants'

const ACCESSTOKENCOOKIE = constants.get('accessTokenCookie')
const SECRET = constants.get('secret')
const INVALID_CREDS = 'INVALID_CREDS'

function verifyPassword (req, response) {
  // username does not exist in DB
  if (!response) {
    return Promise.reject(new Error(INVALID_CREDS))
  }

  return new Promise((resolve, reject) => {
    bcrypt.compare(req.body.password, response, (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

function createJWT (res, result) {
  // incorrect password
  if (result !== true) {
    res.sendStatus(418)
    return
  }

  // create JWT
  const accessToken = jwt.sign({
    // 3 hours
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
  }, SECRET)

  // set cookie to JWT
  res.cookie(ACCESSTOKENCOOKIE, accessToken,
    {
      // 3 hours
      expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
      httpOnly: true
    })

  // send OK response
  res.sendStatus(200)
}

export function authenticateUser (req, res) {
  const startTime = Date.now()

  return getUsersHashedPassword(req.body.username)
    .then(verifyPassword.bind(null, req))
    .then(createJWT.bind(null, res))
    .then(() => {
      increment('login.success')
      time('login.suc', Date.now() - startTime)
    })
    .catch(error => {
      const responseCode = error && error.message === INVALID_CREDS
        ? 418
        : 500

      res.sendStatus(responseCode)
      increment('login.failure')
      time('login.fail', Date.now() - startTime)
    })
}
