import React from 'react';
import cssModules from 'react-css-modules';

import NavBar from './navbar';

import styles from './layout.css';

class Layout extends React.Component {
  render() {
    const { location: { pathname }} = this.props;

    return (
      <div styleName='container'>
        <NavBar path={pathname}></NavBar>
        {this.props.children}
      </div>
    );
  }
}

export default cssModules(Layout, styles);