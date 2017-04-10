import React from 'react'

import ErrorComponent from '../Error'
import Loader from '../Loader'

import Project from './Project'

export default class ProjectsList extends React.Component {
  componentDidMount () {
    if (!this.props.projects) {
      this.props.fetchProjects()
    }
  }

  render () {
    const { projects, isLoading, error } = this.props

    if (projects) {
      const sortedData = projects.sort((a, b) => b.order - a.order)

      return (
        <div>
          {
            sortedData.map(projectsData => (
              <Project key={projectsData.id} cardData={projectsData} />
            ))
          }
        </div>
      )
    } else if (isLoading) {
      return <Loader />
    } else if (error) {
      // @todo reroute to 5xx view
      return <ErrorComponent />
    } else {
      return null
    }
  }
}
