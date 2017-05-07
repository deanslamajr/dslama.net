/* eslint-env jest */
const jwt = {
  verify: jest.fn(() => Promise.resolve())
}

module.exports = jwt
