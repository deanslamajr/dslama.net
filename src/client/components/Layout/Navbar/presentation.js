import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './navbar.css';

class NavBarPresentation extends React.Component {
  generateItemClasses(items) {
    const { activeItem } = this.props;

    const itemSelected = {};

    items.forEach(item => {
      itemSelected[item] = classNames('link', { 'active': activeItem === item.toLowerCase() });
    });

    return itemSelected;
  }

  renderMenuItem(item, styleName) {
    const { onLinkClick } = this.props;

    function _onLinkClick(item) {
      onLinkClick(item);
    }

    return (
      <span key={item} onClick={_onLinkClick.bind(this, item)} styleName={styleName}>
        <Link to={`/${item.toLowerCase()}`}>{item}</Link>
      </span>
    );
  }

  render() {
    const {
      menuItems,
      expanded,
      onMenuClick
    } = this.props;

    const conditionalShow = classNames({
      [styles['show']]: expanded
    });

    const itemsClasses = this.generateItemClasses(menuItems);
    const navbarItems = menuItems.map(item => this.renderMenuItem(item, itemsClasses[item]))

    return (
      <div styleName='outer-container'>
        <span styleName='middle-container'>
          <span>Dean Slama Jr.</span>
          <span onClick={onMenuClick} styleName='mobile'>Menu</span>
        </span>
        <span styleName='inner-container' className={conditionalShow}>
          { navbarItems }
        </span>
      </div>
    );
  }
}

NavBarPresentation.propTypes = {
  menuItems: React.PropTypes.arrayOf(React.PropTypes.string),
  expanded: React.PropTypes.bool.isRequired,
  onMenuClick: React.PropTypes.func.isRequired,
  onLinkClick: React.PropTypes.func.isRequired
}

export default cssModules(NavBarPresentation, styles, { allowMultiple: true });