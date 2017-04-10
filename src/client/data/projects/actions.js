import axios from 'axios'

import { PROJECTS_FETCH, PROJECTS_ADD } from './constants'

export const addProjects = (projects) => ({
  type: PROJECTS_ADD,
  payload: projects
})

export const fetchProjects = () => ({
  type: PROJECTS_FETCH,
  payload: axios.get('/api/projects')
})
