import React from 'react'

import {
  CardLink,
  ShadowCard,
  Title,
  Details,
  Quote,
  OuterContainer
 } from '../Card'

import { formatDate } from '../helpers'

function Reading ({ cardData }) {
  const date = new Date(cardData.publishDate)
  const publishDate = formatDate(date)

  return (
    <OuterContainer>
      <CardLink
        href={cardData.url}
        target='_blank'>
        <ShadowCard>
          <Title>
            {cardData.title}
          </Title>
          <Details>
            <div>
              {`${cardData.author} @ ${cardData.publication}`}
            </div>
            <div>
              {publishDate}
            </div>
          </Details>
          <Quote dangerouslySetInnerHTML={{ __html: cardData.quote }} />
        </ShadowCard>
      </CardLink>
    </OuterContainer>
  )
}

export default Reading
