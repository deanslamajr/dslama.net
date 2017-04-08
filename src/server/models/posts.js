import axios from 'axios'

import constants from '../../../config/constants'

export const get = () => {
  const headers = { 'Accept': 'application/json' }

  return axios.get(`https://medium.com/${constants.get('MEDIUM_USERNAME')}/latest`, { headers })
    .then(({ data }) => {
      // the first 16 characters of the response are unnusable giberish
      const cleanedData = data.substring(16)

      const jsonifiedData = JSON.parse(cleanedData)
      const postsObject = jsonifiedData.payload.references.Post

      return Object.keys(postsObject)
        .map(key => postsObject[key])
    })
}
