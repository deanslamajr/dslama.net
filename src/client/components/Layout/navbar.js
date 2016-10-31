import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './navbar.css';

class NavBar extends React.Component {
  render() {
    return (
      <div styleName='flex outer-container'>
        <span>Dean H. Slama Jr.</span>
        <span styleName='flex inner-container'>
          <span styleName='link'>Posts</span>
          <span styleName='link'>
            <Link to="/stuff">Stuff</Link>
          </span>
          <span styleName='link'>
            <Link to="/about">Projects</Link>
          </span>
          <span styleName='link'>
            <Link to="/blogs">Others</Link>
          </span>
        </span>
      </div>
    );
  }
};

export default cssModules(NavBar, styles, { allowMultiple: true });