import React from 'react';
import cssModules from 'react-css-modules';

import NavbarContainer from './Navbar';

import styles from './layout.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      'About',
      'Projects',
      'Readings'
    ];

    this.title = 'dean slama';
  }

  render() {
    const { location: { pathname }} = this.props;

    return (
      <div styleName='container'>
        <NavbarContainer 
          currentPath={pathname}
          title={this.title}
          menuItems={this.menuItems}
        />
        {this.props.children}
      </div>
    );
  }
}

export default cssModules(Layout, styles);