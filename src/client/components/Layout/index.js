import React from 'react';

import NavBar from './navbar';

import styles from './layout.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        {this.props.children}
      </div>
    );
  }
}