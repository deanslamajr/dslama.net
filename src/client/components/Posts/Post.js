import React from 'react';
import cssModules from 'react-css-modules';

import styles from '../common.css';

import { formatDate } from '../helpers';

function Post({ data }) {
  const mediumUser = process.env.mediumUser;
  const postURL = `https://medium.com/${mediumUser}/${data.uniqueSlug}`

  const date = new Date(data.firstPublishedAt);
  const publishDate = formatDate(date);

  return (
    <div styleName="flex-container">
      <a  
        styleName="card-link"
        href={postURL} 
        target="_blank">
        <div styleName="card shadow">
          <div styleName="title">
            {data.title}
          </div>
          <div styleName="details">
            <div>
              {publishDate}
            </div>
          </div>
          <div styleName="quote">
            {data.previewContent.bodyModel.paragraphs[1].text}
          </div>
        </div>
      </a>
    </div>
  );
}

export default cssModules(Post, styles, { allowMultiple: true });