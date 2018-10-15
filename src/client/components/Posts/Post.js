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

function Post ({ data }) {
  const mediumUser = process.env.mediumUser
  const postURL = `https://medium.com/${mediumUser}/${data.uniqueSlug}`

  const date = new Date(data.firstPublishedAt)
  const publishDate = formatDate(date)

  return (
    <OuterContainer>
      <CardLink
        href={postURL}
        target='_blank'>
        <ShadowCard>
          <Title>
            {data.title}
          </Title>
          <Details>
            <div>
              {publishDate}
            </div>
          </Details>
          <Quote>
            {data.previewContent.bodyModel.paragraphs[1].text}
          </Quote>
        </ShadowCard>
      </CardLink>
    </OuterContainer>
  )
}

export default Post
