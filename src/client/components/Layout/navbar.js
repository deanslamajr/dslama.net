import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './navbar.css';

class NavBar extends React.Component {
  constructor() {
    super();

    this._onMenuClick = this._onMenuClick.bind(this);

    this.menuItems = [
      'Posts',
      'Projects',
      'Stuff',
      'Others'
    ];

    this.state = {
      expanded: false
    };
  }

  componentWillMount() {
    let { path } = this.props;

    // get the base pathname 
    // e.g. '/Posts/12' => 'posts'
    path = path.split('/')[1].toLowerCase();

    this.setState({ path })
  }

  _onMenuClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  _onLinkClick(item) {
    this.setState({ 
      expanded: false,
      path: item.toLowerCase()
    });
  }

  generateItemClasses(items) {
    const itemSelected = {};

    items.forEach(item => {
      itemSelected[item] = classNames('link', { 'active': this.state.path === item.toLowerCase() });
    });

    return itemSelected;
  }

  renderMenuItem(item, styleName) {
    return (
      <span key={item} onClick={this._onLinkClick.bind(this, item)} styleName={styleName}>
        <Link to={`/${item.toLowerCase()}`}>{item}</Link>
      </span>
    );
  }

  render() {
    const conditionalShow = classNames({
      [styles['show']]: this.state.expanded
    });

    const itemsClasses = this.generateItemClasses(this.menuItems);
    const menuItems = this.menuItems.map(item => this.renderMenuItem(item, itemsClasses[item]))

    return (
      <div styleName='outer-container'>
        <span styleName='middle-container'>
          <span>Dean H. Slama Jr.</span>
          <span onClick={this._onMenuClick} styleName='mobile'>Menu</span>
        </span>
        <span styleName='inner-container' className={conditionalShow}>
          { menuItems }
        </span>
      </div>
    );
  }
};

export default cssModules(NavBar, styles, { allowMultiple: true });