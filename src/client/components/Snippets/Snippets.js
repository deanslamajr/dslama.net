import React from 'react';
import cssModules from 'react-css-modules';

import styles from './snippets.css';

function formatDate(date) {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
}

class Snippets extends React.Component {
  constructor(props) {
    super(props);

    this._renderCard = this._renderCard.bind(this);
  }

  _renderCard(cardData, index) {
    // alternate flex box ordering
    const order = index % 2 === 0 
      ? 'left'
      : 'right';

    const date = new Date(cardData.publishDate);
    const publishDate = formatDate(date);

    return (
      <div key={cardData.id} styleName='flex-container'>
        <a  
          styleName='link'
          href={cardData.url} 
          target='_blank'
          className={styles[order]}>
          <div styleName='card shadow'>
            <div styleName='title'>
              {cardData.title}
            </div>
            <div styleName='details'>
              {`${cardData.author} @ ${cardData.publication}`}
            </div>
            <div styleName='details'>
              {publishDate}
            </div>
            <div styleName='quote'>
              {cardData.quote}
            </div>
          </div>
        </a>
        <div styleName='image'>
          <img styleName='shadow' src={cardData.imagePath}/>
        </div>
      </div>
    );
  }

  render() {
    const { cardData } = this.props;
    let sortedData;

    if (cardData) {
      sortedData = cardData.sort((a, b) => b.foundDate - a.foundDate)
    }

    return (
      <div>
        { sortedData
            ? sortedData.map(this._renderCard) 
            : null
        }
      </div>
    );
  }
}

export default cssModules(Snippets, styles, { allowMultiple: true });