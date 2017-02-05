import React from 'react';
import cssModules from 'react-css-modules';

import styles from './error.css';

function error() {
  return (
    <div styleName="container">
      <div styleName="message">500 error, our apologies.</div>
      <div styleName="message">This error is the engineer's fault.</div>
    </div>
  );
}

export default cssModules(error, styles, { allowMultiple: true });