import React from 'react'
import styled from 'styled-components'
import { media, shadow, card } from '../../style/style-utils'
import Helmet from 'react-helmet'

import Header from '../Header'
import Loader from '../Loader'
import ErrorComponent from '../Error'

const LogoContainer = styled.div`
  ${shadow()}

  height: 15rem;
  margin: 0 1.5rem;

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

const LinksContainer = styled.div`
  font-size: 1.25rem;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${media.tabletMax`
    margin-top: 2rem;
  `}

  ${media.phoneMax`
    justify-content: space-around;
  `}
`

const LinkItem = styled.li`
  display: inline;
  margin: 2rem;

  ${media.tabletMax`
    margin: 0 1.5rem;
  `}

  ${media.phoneMax`
    margin: .5rem;
  `}
`

const Link = styled.a`
  color: black;

  :link {
    color: black;
  }

  :visited {
    color: black;
  }
`

function renderLinks (linksArray) {
  return (
    <LinksContainer>
      {
        linksArray.map(({ name, url }) => (
          <LinkItem key={name}>
            <Link href={url} target='_blank'>{name}</Link>
          </LinkItem>
        ))
      }
    </LinksContainer>
  )
}

const BioCard = styled.div`
  ${shadow()}
  ${card()}

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: justify;
  font-size: 1.15rem;

  ${media.tabletMax`
    margin: 2rem 1.5rem;
  `}

  ${media.phoneMax`
    margin: 2rem .75rem;
  `}
`

function renderBio (bio) {
  return <BioCard dangerouslySetInnerHTML={{__html: bio}} />
}

const AboutContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`

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
        <AboutContainer>
          { data.title ? <Header summary={data.title} /> : null }
          { data.pictureURL ? renderLogo(data.pictureURL) : null }
          { data.links ? renderLinks(data.links) : null }
          { data.bio ? renderBio(data.bio) : null }
        </AboutContainer>
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

export default About