import React from 'react';
import cssModules from 'react-css-modules';

import NavBar from './Navbar';

import styles from './layout.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      'Posts',
      'Projects',
      'Snippets',
      'Neat'
    ];
  }

  render() {
    const { location: { pathname }} = this.props;

    return (
      <div styleName='container'>
        <NavBar 
          currentPath={pathname}
          menuItems={this.menuItems}
        />
        {this.props.children}
      </div>
    );
  }
}

export default cssModules(Layout, styles);