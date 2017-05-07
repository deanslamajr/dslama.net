/* eslint-env jest */
const metrics = {
  middleware: jest.fn(),
  increment: jest.fn(),
  sendTimeMetric: jest.fn(),
  client: jest.fn()
}

module.exports = metrics
