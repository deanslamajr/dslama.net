import db from './db'
import { verifyResponse } from './utils'
import constants from '../../../config/constants'

export const get = () => {
  return db
    .table(constants.get('DB_TABLE_PROJECTS'))
    .scan()
    .then(verifyResponse)
}
