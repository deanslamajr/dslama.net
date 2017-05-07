/* eslint-env jest */
const passwordResponse = {}

const user = {
  getHashedPassword: jest.fn(() => Promise.resolve(passwordResponse))
}

module.exports = user
