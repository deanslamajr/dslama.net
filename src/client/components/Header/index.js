import React from 'react'
import cssModules from 'react-css-modules'

import styles from './header.css'

function Header ({ summary }) {
  return (
    <div styleName='container'>
      { summary }
    </div>
  )
}

export default cssModules(Header, styles)
