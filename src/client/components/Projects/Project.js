import React from 'react'
import cssModules from 'react-css-modules'

import styles from './project.css'

function Project ({ cardData }) {
  return (
    <div key={cardData.id} styleName='flex-container'>
      <div styleName='card shadow'>
        <div styleName='title'>
          <a href={cardData.url} target='_blank' styleName='project-link'>{cardData.name}</a>
           -
          <a href={cardData.source} target='_blank' styleName='source-link'>source</a>
        </div>
        <div styleName='description'>
          {cardData.description}
        </div>
        <div styleName='quote' dangerouslySetInnerHTML={{ __html: cardData.summary }} />
      </div>
    </div>
  )
}

export default cssModules(Project, styles, { allowMultiple: true })
