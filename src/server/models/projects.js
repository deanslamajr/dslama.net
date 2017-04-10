import db from './db'

import constants from '../../../config/constants'

function verifyResponse (res) {
  if (!Array.isArray(res)) {
    throw new Error('DB response was not the expected type: Array')
  }
  if (!res.length) {
    throw new Error('DB returned an empty array.')
  }
}

export const get = () => {
  return db
    .table(constants.get('DB_TABLE_PROJECTS'))
    .scan()
    .then(res => {
      verifyResponse(res)
      return res
    })
}
