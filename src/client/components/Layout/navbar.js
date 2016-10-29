import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './navbar.css';

class NavBar extends React.Component {
  render() {
    return (
      <div styleName='container'>
        <h1>Dean H. Slama Jr.</h1>
        <span>Posts</span>
        <span><Link to="/stuff">Stuff</Link></span>
        <span><Link to="/about">Projects</Link></span>
        <span><Link to="/blogs">Others</Link></span>
      </div>
    );
  }
};

export default cssModules(NavBar, styles);