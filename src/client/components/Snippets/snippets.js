import React from 'react';
import cssModules from 'react-css-modules';

import styles from './snippets.css';

class Snippets extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCard(cardData) {
    return (
      <a 
        key={cardData.ID} 
        styleName='link'
        href={cardData.URL} 
        target='_blank'>
        <div styleName='flexContainer'>
          <div styleName='card'>
            <div styleName='title'>
              {cardData.Title}
            </div>
            <div styleName='author'>
              {`${cardData.Author} @ ${cardData.publication}`}
            </div>
            <div styleName='quote'>
              {cardData.Quote}
            </div>
          </div>
          <div styleName='image'>
            <img src={cardData.imagePath}/>
          </div>
        </div>
      </a>
    );
  }

  render() {
    const { cardData } = this.props;

    return (
      <div>
        { cardData
            ? cardData.map(this._renderCard) 
            : null
        }
      </div>
    );
  }
}

export default cssModules(Snippets, styles, { allowMultiple: true });