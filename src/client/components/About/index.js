import React from 'react'

import AboutContainer from './AboutContainer'

export default class AboutParentContainer extends React.Component {
  render () {
    const { children: editAboutComponent } = this.props

    return editAboutComponent || <AboutContainer />
  }
}
