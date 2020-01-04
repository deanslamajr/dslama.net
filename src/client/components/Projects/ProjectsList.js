import React from 'react'
import Helmet from 'react-helmet'

import Header from '../Header'
import Loader from '../Loader'
import ErrorComponent from '../Error'

import Project from './Project'

const summary = 'Cool, handbuilt webapps. Click on a title to start one up.'

export default class ProjectsList extends React.Component {
  componentDidMount () {
    if (!this.props.projects) {
      this.props.fetchProjects()
    }
  }

  render () {
    const { projects, isLoading, error } = this.props
    let content

    if (projects) {
      const sortedData = projects.sort((a, b) => b.order - a.order)

      content = (
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
      content = (
        <div>
          <Header summary={summary} />
          <Loader />
        </div>
      )
    } else if (error) {
      // @todo reroute to 5xx view
      content = <ErrorComponent />
    } else {
      content = null
    }

    return (
      <div>
        <Helmet>
          <title>dslama.net - projects</title>
        </Helmet>
        {content}
      </div>
    )
  }
}
