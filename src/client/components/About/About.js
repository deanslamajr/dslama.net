import React from 'react'
import cssModules from 'react-css-modules'
import styled from 'styled-components'
import { media, shadow } from '../../style/style-utils'
import Helmet from 'react-helmet'

import styles from './about.css'

import Header from '../Header'
import Loader from '../Loader'
import ErrorComponent from '../Error'

const LogoContainer = styled.div`
  height: 15rem;
  margin: 0 1.5rem;
  ${shadow()}

  ${media.tabletMax`
    height: 14rem;
  `}

  ${media.phoneMax`
    margin: 0 .75rem;
  `}
`

const BackgroundImage = styled.div`
  background-image: url("${props => props.imageUrl}"), url("${props => props.imageUrl}");
  background-repeat: no-repeat,no-repeat;
  background-color: #e7eeed;
  background-blend-mode: color-burn, color-burn;
  height: 100%;
  width: 100%;
  background-position-x: 24rem, -3rem;
  background-position-y: -20rem, -5rem;
  background-size: 70rem, 30rem;

  ${media.tabletMax`
    background-position-x: 16rem, -3rem;
    background-position-y: -11rem, 0rem;
    background-size: 45rem, 22rem;
  `}

  ${media.phoneMax`
    background-blend-mode: color-burn, lighten;
    background-position-x: 0rem;
    background-position-y: 50%;
    background-size: 125%;
  `}
`

function renderLogo (imageUrl) {
  return (
    <LogoContainer>
      <BackgroundImage imageUrl={imageUrl} />
    </LogoContainer>
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
