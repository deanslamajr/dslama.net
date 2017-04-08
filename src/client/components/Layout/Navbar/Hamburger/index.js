import React from 'react'
import cssModules from 'react-css-modules'
import classNames from 'classnames'

import styles from './hamburger.css'

class Hamburger extends React.Component {
  render () {
    const { onMenuClick, expanded } = this.props

    const isActive = classNames({
      active: expanded
    }, 'mobile', 'hamburger')

    return (
      <div onClick={onMenuClick} styleName={isActive}>
        <span styleName='line' />
        <span styleName='line' />
        <span styleName='line' />
      </div>
    )
  }
}

export default cssModules(Hamburger, styles, { allowMultiple: true })
