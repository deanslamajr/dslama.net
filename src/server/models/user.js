import db from './db'

import constants from '../../../config/constants'

export const getHashedPassword = (username) => {
  return db
    .table(constants.get('DB_TABLE_USERS'))
    .where('name').eq(username)
    .get()
    .then(res => {
      return res && res.password
        ? res.password
        : null
    })
}
