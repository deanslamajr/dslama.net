/* eslint-env jest */
const bcrypt = {
  compare: jest.fn((_, __, cb) => {
    cb(null, true)
  })
}

module.exports = bcrypt
