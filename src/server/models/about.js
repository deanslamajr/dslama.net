import db from './db'
import { verifyResponse } from './utils'
import constants from '../../../config/constants'

function reverseSortResponseByVersion (res) {
  return res.sort((a, b) => {
    // if either item does not have a valid version property, sort that item as less important
    if (!a.version || !Number.isInteger(a.version)) {
      return 1
    }
    if (!b.version || !Number.isInteger(b.version)) {
      return -1
    }
    return b.version - a.version
  })
}

export const get = () => {
  return db
    .table(constants.get('DB_TABLE_ABOUT'))
    .scan()
    .then(res => {
      verifyResponse(res)
      // return the most recent version
      return reverseSortResponseByVersion(res)[0]
    })
}
