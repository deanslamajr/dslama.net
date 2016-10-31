import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './navbar.css';

class NavBar extends React.Component {
  constructor() {
    super();

    this._onMenuClick = this._onMenuClick.bind(this);
    this._onLinkClick = this._onLinkClick.bind(this);

    this.state = {
      expanded: false
    };
  }

  _onMenuClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  _onLinkClick() {
    this.setState({ expanded: false })
  }

  render() {
    const conditionalShow = classNames({
      [styles['show']]: this.state.expanded
    });

    return (
      <div styleName='outer-container'>
        <span styleName='middle-container'>
          <span>Dean H. Slama Jr.</span>
          <span onClick={this._onMenuClick} styleName='mobile'>Menu</span>
        </span>
        <span styleName='inner-container' className={conditionalShow}>
          <span onClick={this._onLinkClick} styleName='link'>
            <Link to="/posts">Posts</Link>
          </span>
          <span onClick={this._onLinkClick} styleName='link'>
            <Link to="/projects">Projects</Link>
          </span>
          <span onClick={this._onLinkClick} styleName='link'>
            <Link to="/stuff">Stuff</Link>
          </span>
          <span onClick={this._onLinkClick} styleName='link'>
            <Link to="/others">Others</Link>
          </span>
        </span>
      </div>
    );
  }
};

export default cssModules(NavBar, styles, { allowMultiple: true });