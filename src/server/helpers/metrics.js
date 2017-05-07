/**
 * @overview Metrics configuration
 * @requires lynx
 *
 * @todo only send metrics if `METRICS_HOST` and other required env vars are set, otherwise leave as placeholder functions
 */

import Lynx from 'lynx'

import constants from '../../../config/constants'

const settings = {
  host: constants.get('METRICS_HOST'),
  port: constants.get('METRICS_PORT')
}

const client = new Lynx(settings.host, settings.port)

const prefix = constants.get('METRICS_PREFIX') || 'dslamanet'

function sanitizeName (name) {
  const tokens = name.split('/')

  // prevent a leading '_'
  tokens.shift()
  return tokens.join('_')
}

function createRequestNamespace (req) {
  const method = req.method || 'unknown_method'
  const urlTokens = req.originalUrl.split('?')
  const resourceName = urlTokens[0].replace('.', '_')
  const sanitizedResourceName = sanitizeName(resourceName)
  return ['requests', method.toLowerCase(), sanitizedResourceName].join('.')
}

function increment (data) {
  client.increment(`${prefix}.${data}`)
}

function time (data, duration) {
  client.timing(`${prefix}.${data}`, duration)
}

function sendTimeMetric (startTime, namespace, result) {
  const duration = new Date().getTime() - startTime
  time(`${namespace}.${result}`, duration)
}

/**
 * Function called on response finish that sends stats to statsd
 **/
function sendFinishedRequest (req, res, startTime) {
  // we don't want to metric EB health queries
  if (req.path.includes('health')) {
    return
  }

  const namespace = createRequestNamespace(req)

  // Send metric: Status Code
  const statusCode = res.statusCode || 'unknown_status'
  increment(`${namespace}.status_code.${statusCode}`)

  // Send metric: Response Time
  const duration = new Date().getTime() - startTime
  time(`${namespace}.response_time`, duration)
}

/**
 * Function called on request close (client initiated) that sends stats to statsd
 **/
function sendRequestClosed (req, startTime) {
  // we don't want to metric EB health queries
  if (req.path.includes('health')) {
    return
  }

  const namespace = createRequestNamespace(req)

  // Send metric: Status Code
  increment(`${namespace}.status_code.client_closed_connection`)

  // Send metric: Response Time
  const duration = new Date().getTime() - startTime
  time(`${namespace}.response_time`, duration)
}

function middleware (req, res, next) {
  const startTime = new Date().getTime()

  // Add response listeners
  //
  // Server finishes sending a response
  res.once('finish', sendFinishedRequest.bind(null, req, res, startTime))
  // Client initiated the end of the request
  req.once('close', sendRequestClosed.bind(null, req, startTime))

  if (next) {
    next()
  }
}

module.exports = {
  middleware,
  increment,
  sendTimeMetric,
  client
}
