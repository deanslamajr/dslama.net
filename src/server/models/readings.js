import db from './db'
import { verifyResponse } from './utils'
import constants from '../../../config/constants'

export const add = (data) => {
  return db
    .table(constants.get('DB_TABLE_READINGS'))
    .insert(data)
}

export const get = () => {
  return db
    .table(constants.get('DB_TABLE_READINGS'))
    .scan()
    .then(verifyResponse)
}
