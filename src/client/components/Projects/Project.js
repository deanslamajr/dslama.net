import React from 'react'
import styled from 'styled-components'

import {
  ShadowCard,
  Title,
  Quote,
  OuterContainer
 } from '../Card'

const ProjectLink = styled.a`
  text-decoration: none;
  padding-right: .5rem;
  color: inherit;
`

const SourceLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  padding-left: .5rem;
  color: #b21a27;
`

const Description = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1.1rem;
  margin: 1rem 0;
`

function Project ({ cardData }) {
  return (
    <OuterContainer key={cardData.id}>
      <ShadowCard>
        <Title>
          <ProjectLink href={cardData.url} target='_blank' styleName='project-link'>{cardData.name}</ProjectLink>
           -
          <SourceLink href={cardData.source} target='_blank' styleName='source-link'>source</SourceLink>
        </Title>
        <Description>
          {cardData.description}
        </Description>
        <Quote dangerouslySetInnerHTML={{ __html: cardData.summary }} />
      </ShadowCard>
    </OuterContainer>
  )
}

export default Project
