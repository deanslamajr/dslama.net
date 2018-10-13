import React from 'react'
import styled from 'styled-components'

import { media, shadow } from '../../../style/style-utils'

import Hamburger from './Hamburger'

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
    margin-top: 0;
    border-radius: 0;
  `}

  ${media.phoneMax`
    margin-top: 0;
    flex-direction: column;
    padding: .5rem .2rem 0;
  `}
`

const MiddleContainer = styled.span`
  display: flex;
  font-size: 2rem;
  justify-content: space-between;
  padding: .4rem .2rem 0;
  cursor: default;

  ${media.phoneMax`
    padding: 0;
  `}
`

const InnerContainer = styled.span`
  display: flex;
  justify-content: flex-end;
  padding-right: .55rem;

  ${media.tabletMax`
    margin-left: 1rem;
  `}

  ${media.phoneMax`
    display: ${props => props.expanded ? 'inline' : 'none' };
    flex-direction: column;
  `}
`

const MenuItem = styled.span`
  margin-left: 2rem;
  padding: .45rem .2rem .1rem;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;

  text-decoration: ${props => props.isActive ? 'underline' : 'inherit'};

  ${media.tabletMax`
    margin-left: .8rem;
  `}

  ${media.phoneMax`
    display: block;
    text-align: right;
    padding-right: 1.25rem;
    font-size: 1.75rem;
    border-top: 1px solid #002e2a;
    margin: 0;
  `}
`

class NavBar extends React.Component {
  render () {
    const {
      activeItem,
      title,
      menuItems,
      expanded,
      onLinkClick,
      onMenuClick
    } = this.props

    return (
      <OuterContainer>
        <MiddleContainer>
          <span>{title}</span>
          <Hamburger onMenuClick={onMenuClick} expanded={expanded} />
        </MiddleContainer>
        <InnerContainer expanded={expanded}>
          {menuItems.map(item => (
            <MenuItem
              key={item}
              onClick={() => onLinkClick(item)}
              isActive={activeItem === item.toLowerCase()}
            >
              {item}
            </MenuItem>
          ))}
        </InnerContainer>
      </OuterContainer>
    )
  }
}

export default NavBar
