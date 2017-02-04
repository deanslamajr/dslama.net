import React from 'react';
import cssModules from 'react-css-modules';

import styles from './readings.css';

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

class Readings extends React.Component {
  constructor(props) {
    super(props);

    this._renderCard = this._renderCard.bind(this);
  }

  _renderCard(cardData, index) {
    const date = new Date(cardData.publishDate);
    const publishDate = formatDate(date);

    return (
      <div key={cardData.id} styleName='flex-container'>
        <a  
          styleName='link'
          href={cardData.url} 
          target='_blank'>
          <div styleName='card shadow'>
            <div styleName='title'>
              {cardData.title}
            </div>
            <div styleName='details'>
              <div>
                {`${cardData.author} @ ${cardData.publication}`}
              </div>
              <div>
                {publishDate}
              </div>
            </div>
            <div styleName='quote'>
              {cardData.quote}
            </div>
          </div>
        </a>
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

export default cssModules(Readings, styles, { allowMultiple: true });