import React from 'react';
import cssModules from 'react-css-modules';

import styles from './readings.css';

import ErrorComponent from '../Error';
import Loader from '../Loader';

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
            <div styleName='quote' dangerouslySetInnerHTML={{__html: cardData.quote }} />
          </div>
        </a>
      </div>
    );
  }

  componentDidMount() {
    if (!this.props.readings) {
      this.props.fetchReadings();
    }
  }

  render() {
    const { readings, isLoading, error } = this.props;
    let sortedData;

    if (readings) {
      sortedData = readings.sort((a, b) => b.foundDate - a.foundDate);

      return (
        <div>
          { sortedData
              ? sortedData.map(this._renderCard) 
              : null
          }
        </div>
      );
    }
    else if (isLoading) {
      return <Loader />;
    }
    else if (error) {
      // @todo reroute to 5xx view
      return <ErrorComponent />;
    }
    else {
      return null;
    }
  }
}

export default cssModules(Readings, styles, { allowMultiple: true });