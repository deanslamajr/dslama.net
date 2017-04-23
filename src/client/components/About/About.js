import React from 'react'
import cssModules from 'react-css-modules'
import Helmet from 'react-helmet'

import styles from './about.css'

import Header from '../Header'
import Loader from '../Loader'
import ErrorComponent from '../Error'

function renderLogo (imageURL) {
  const backgroundImage = {
    backgroundImage: `url(${imageURL}), url(${imageURL})`
  }

  return (
    <div styleName='logo-container shadow'>
      <div style={backgroundImage} styleName='logo-main' />
    </div>
  )
}

function renderLinks (linksArray) {
  return (
    <div styleName='links'>
      {
        linksArray.map(({ name, url }) => (
          <li key={name} styleName='link'>
            <a href={url} target='_blank'>{name}</a>
          </li>
        ))
      }
    </div>
  )
}

function renderBio (bio) {
  return <div styleName='bio card shadow' dangerouslySetInnerHTML={{__html: bio}} />
}

class About extends React.Component {
  componentDidMount () {
    if (!this.props.data) {
      this.props.fetchAbout()
    }
  }

  render () {
    const { data, isLoading, error } = this.props
    let content

    if (data) {
      content = (
        <div styleName='about'>
          { data.title ? <Header summary={data.title} /> : null }
          { data.pictureURL ? renderLogo(data.pictureURL) : null }
          { data.links ? renderLinks(data.links) : null }
          { data.bio ? renderBio(data.bio) : null }
        </div>
      )
    } else if (isLoading) {
      content = <Loader />
    } else if (error) {
      // @todo reroute to 5xx view
      content = <ErrorComponent />
    } else {
      content = null
    }

    return (
      <div>
        <Helmet>
          <title>dslama.net - about</title>
        </Helmet>
        {content}
      </div>
    )
  }
}

export default cssModules(About, styles, { allowMultiple: true })
