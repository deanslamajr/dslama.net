import React from 'react';
import cssModules from 'react-css-modules';

import NavbarContainer from './Navbar';

import styles from './layout.css';

function renderFooter() {
  return (
    <div styleName="footer-container">
      This page is one part of a web application<br />
      created by Dean Slama<br />
      Feel free to <a styleName="footer-link" href="https://github.com/deanslamajr/deanslamajr.com" target="_blank">fork the codes</a> and host your own! 
    </div>
  )
}

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      'about',
      'posts',
      'projects',
      'readings'
    ];

    this.title = 'dean slama';
  }

  render() {
    const { location: { pathname }} = this.props;

    return (
      <div styleName="container">
        <NavbarContainer 
          currentPath={pathname}
          title={this.title}
          menuItems={this.menuItems}
        />
        {this.props.children}
        {renderFooter()}
      </div>
    );
  }
}

export default cssModules(Layout, styles);