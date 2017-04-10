import React from 'react'

import ProjectsContainer from './ProjectsContainer'

export default class ProjectsParentContainer extends React.Component {
  render () {
    const { children: editProjectsComponent } = this.props

    return editProjectsComponent || <ProjectsContainer />
  }
}
