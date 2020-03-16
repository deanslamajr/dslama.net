import styled from 'styled-components';

import { breakpoints } from '../../layouts';
import { ExpandableContainerProps } from '../Navbar.styles';

export const OuterContainer = styled.div`
  display: none;
  :hover {
    cursor: pointer;
  }

  ${breakpoints.phoneMax`
    display: inline;
    padding-top: .2rem;
    padding-right: .3rem;
  `}
`;

export const Line = styled.span<ExpandableContainerProps>`
  width: 35px;
  height: 3px;
  background-color: #ecf0f1;
  display: block;
  margin: 0 auto 7px;
  transition: all 0.3s ease-in-out;

  :nth-child(2) {
    opacity: ${props => (props.expanded ? 0 : 'inherit')};
  }
  :nth-child(1) {
    transform: ${props =>
      props.expanded ? 'translateY(10px) rotate(45deg)' : 'inherit'};
  }
  :nth-child(3) {
    transform: ${props =>
      props.expanded ? 'translateY(-10px) rotate(-45deg)' : 'inherit'};
  }
`;
