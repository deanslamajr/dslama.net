import React from 'react'
import styled from 'styled-components'
import { media, shadow, card } from '../../style/style-utils'

import classNames from 'classnames'
import cssModules from 'react-css-modules'

import Hamburger from './Hamburger'

import styles from './navbar.css'

//<div styleName='outer-container shadow'>

const OuterContainer = styled.div`
  ${shadow()}

  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #004741;
  color: white;
  border-radius: 2px;

  ${media.tabletMax`
    margin: 2rem 1.5rem;
  `}

  ${media.phoneMax`
    margin: 2rem .75rem;
  `}
`

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
