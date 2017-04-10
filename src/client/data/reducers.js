import { combineReducers } from 'redux'

import readings from './readings/reducers'
import about from './about/reducers'
import posts from './posts/reducers'
import projects from './projects/reducers'

export default combineReducers({
  readings,
  about,
  posts,
  projects
})
