import { connect } from 'react-redux'

import { fetchProjects } from '../../data/projects/actions'
import ProjectsList from './ProjectsList'

function mapStateToProps (state) {
  if (state.projects.isLoading) {
    return {
      isLoading: true
    }
  } else if (state.projects.error) {
    // @todo log error
    return {
      error: true
    }
  } else if (state.projects.isFetched) {
    return {
      projects: state.projects.data
    }
  } else {
    return {}
  }
}

export default connect(mapStateToProps, { fetchProjects })(ProjectsList)
