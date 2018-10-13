import React from 'react'
import styled from 'styled-components'

import { media } from '../../../../style/style-utils'

const OuterContainer = styled.div`
  display: none;
  :hover{
    cursor: pointer;
  }

  ${media.phoneMax`
    display: inline;
    padding-top: .2rem;
    padding-right: .3rem;
  `}
`

const Line = styled.span`
  width: 35px;
  height: 3px;
  background-color: #ecf0f1;
  display: block;
  margin: 0 auto 7px;
  transition: all 0.3s ease-in-out;

  :nth-child(2){
    opacity: ${props => props.expanded ? 0 : 'inherit'};
  }
  :nth-child(1){
    transform: ${props => props.expanded ? 'translateY(10px) rotate(45deg)' : 'inherit'};
  }
  :nth-child(3){
    transform: ${props => props.expanded ? 'translateY(-10px) rotate(-45deg)' : 'inherit'};
  }
`

class Hamburger extends React.Component {
  render () {
    const { onMenuClick, expanded } = this.props

    return (
      <OuterContainer onClick={onMenuClick}>
        <Line expanded={expanded} />
        <Line expanded={expanded} />
        <Line expanded={expanded} />
      </OuterContainer>
    )
  }
}

export default Hamburger
