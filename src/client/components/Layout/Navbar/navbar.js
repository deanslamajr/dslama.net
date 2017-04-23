import React from 'react'
import classNames from 'classnames'
import cssModules from 'react-css-modules'

import Hamburger from './Hamburger'

import styles from './navbar.css'

class NavBar extends React.Component {
  _generateItemClasses (items) {
    const { activeItem } = this.props

    const itemSelected = {}

    items.forEach(item => {
      itemSelected[item] = classNames('link', { 'active': activeItem === item.toLowerCase() })
    })

    return itemSelected
  }

  _renderMenuItem (item, styleName) {
    const { onLinkClick } = this.props

    function _onLinkClick (item) {
      onLinkClick(item)
    }

    return (
      <span key={item} onClick={_onLinkClick.bind(this, item)} styleName={styleName}>
        {item}
      </span>
    )
  }

  render () {
    const {
      title,
      menuItems,
      expanded,
      onMenuClick
    } = this.props

    const conditionalShow = classNames({
      [styles['show']]: expanded
    })

    const itemsClasses = this._generateItemClasses(menuItems)
    const navbarItems = menuItems.map(item => this._renderMenuItem(item, itemsClasses[item]))

    return (
      <div styleName='outer-container shadow'>
        <span styleName='middle-container'>
          <span>{title}</span>
          <Hamburger onMenuClick={onMenuClick} expanded={expanded} />
        </span>
        <span styleName='inner-container' className={conditionalShow}>
          { navbarItems }
        </span>
      </div>
    )
  }
}

export default cssModules(NavBar, styles, { allowMultiple: true })
