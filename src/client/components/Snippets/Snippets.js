import React from 'react';
import cssModules from 'react-css-modules';

import styles from './snippets.css';

class Snippets extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCard(cardData, index) {
    // alternate flex box ordering
    const order = index % 2 === 0 
      ? 1 
      : 2;

    return (
      <div key={cardData.ID} styleName='flex-container'>
        <a  
          styleName='link'
          href={cardData.URL} 
          target='_blank'
          style={{order}}>
          <div styleName='card shadow'>
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
        </a>
        <div styleName='image'>
          <img styleName='shadow' src={cardData.imagePath}/>
        </div>
      </div>
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