/* eslint-env jest */

const environment = {
  accessTokenCookie: 'accessTokenCookie',
  secret: 'secret'
}

const constants = {
  get: (key) => environment[key]
}

module.exports = constants
