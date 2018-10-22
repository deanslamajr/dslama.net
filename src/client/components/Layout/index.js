import React from 'react'
import styled from 'styled-components'

import NavbarContainer from './Navbar'
import { media } from '../../style/style-utils'

const OuterContainer = styled.div`
  padding: 0 1.5%;
  background-color: #e7eeed;
  position: absolute;
  min-height: 100%;
  left: 12%;
  right: 12%;

  ${ media.tabletMax`
    padding: 0;
    left: 0;
    right: 0;
  ` }
`

const Footer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding: 5rem 0 3rem;
  color: rgba(0, 0, 0, .4);
  font-size: .75rem;
  text-align: center;

  ${ media.tabletMax`
    padding: 1rem .75rem 3rem;
  ` }
`

const Link = styled.a`
  color: inherit;
`

class Layout extends React.Component {
  constructor (props) {
    super(props)

    this.menuItems = [
      'about',
      'posts',
      'projects',
      'readings'
    ]

    this.title = 'dean slama'
  }

  render () {
    const { location: { pathname } } = this.props

    return (
      <OuterContainer>
        <NavbarContainer
          currentPath={pathname}
          title={this.title}
          menuItems={this.menuItems}
          {...this.props}
        />
        {this.props.children}
        <Footer>
          Feel free to <Link href='https://github.com/deanslamajr/deanslamajr.com' target='_blank'>fork this spa</Link> and host it!
        </Footer>
      </OuterContainer>
    )
  }
}

export default Layout
