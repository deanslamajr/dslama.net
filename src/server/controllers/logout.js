import constants from '../../../config/constants'

const ACCESSTOKENCOOKIE = constants.get('accessTokenCookie')

export function logout (req, res) {
  res.clearCookie(ACCESSTOKENCOOKIE, {})
  res.sendStatus(200)
}
