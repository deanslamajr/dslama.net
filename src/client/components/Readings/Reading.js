import React from 'react';
import cssModules from 'react-css-modules';

import styles from '../common.css';

import { formatDate } from '../helpers';

function Reading({ cardData }) {
  const date = new Date(cardData.publishDate);
  const publishDate = formatDate(date);

  return (
    <div key={cardData.id} styleName="flex-container">
      <a  
        styleName="card-link"
        href={cardData.url} 
        target="_blank">
        <div styleName="card shadow">
          <div styleName="title">
            {cardData.title}
          </div>
          <div styleName="details">
            <div>
              {`${cardData.author} @ ${cardData.publication}`}
            </div>
            <div>
              {publishDate}
            </div>
          </div>
          <div styleName="quote" dangerouslySetInnerHTML={{__html: cardData.quote }} />
        </div>
      </a>
    </div>
  );
}

export default cssModules(Reading, styles, { allowMultiple: true });