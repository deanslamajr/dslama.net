import React from 'react';

import NavBar from './navbar';

import styles from './layout.css';

export default class Layout extends React.Component {
  render() {
    const { location: { pathname }} = this.props;

    return (
      <div>
        <NavBar path={pathname}></NavBar>
        {this.props.children}
      </div>
    );
  }
}