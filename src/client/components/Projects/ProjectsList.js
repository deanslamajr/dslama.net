import React from 'react'

import Header from '../Header'
import Loader from '../Loader'
import ErrorComponent from '../Error'

import Project from './Project'

const summary = 'This is a list of software authored by the developer. Clicking on the title of an item will open a new tab/window navigated to a publicly hosted version of the software. Each project`s source code is available via the `source` link.'

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
          <Header summary={summary} />
          {
            sortedData.map(projectsData => (
              <Project key={projectsData.id} cardData={projectsData} />
            ))
          }
        </div>
      )
    } else if (isLoading) {
      return (
        <div>
          <Header summary={summary} />
          <Loader />
        </div>
      )
    } else if (error) {
      // @todo reroute to 5xx view
      return <ErrorComponent />
    } else {
      return null
    }
  }
}
