import axios from 'axios'

import { ABOUT_FETCH, ABOUT_ADD } from './constants'

export const fetchAbout = () => ({
  type: ABOUT_FETCH,
  payload: axios.get('/api/about')
})

export const addAbout = (data) => ({
  type: ABOUT_ADD,
  payload: data
})
