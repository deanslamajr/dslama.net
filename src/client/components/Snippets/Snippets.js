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
      <div key={cardData.id} styleName='flex-container'>
        <a  
          styleName='link'
          href={cardData.url} 
          target='_blank'
          style={{order}}>
          <div styleName='card shadow'>
            <div styleName='title'>
              {cardData.title}
            </div>
            <div styleName='author'>
              {`${cardData.author} @ ${cardData.publication}`}
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