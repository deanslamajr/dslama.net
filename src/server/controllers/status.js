import { verify as verifyJWT } from '../models/jwt'

export function isAuthenticated (req, res) {
  return verifyJWT(req)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => {
      // @todo log error
      res.sendStatus(418)
    })
}
