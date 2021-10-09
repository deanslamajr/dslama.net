import styled from 'styled-components';

import { breakpoints } from '../layouts';

export interface ExpandableContainerProps {
  expanded: boolean;
}

export const InnerContainer = styled.span<ExpandableContainerProps>`
  display: flex;
  justify-content: flex-end;
  padding-right: 0.55rem;
  ${breakpoints.tabletMax`
    margin-left: 1rem;
  `}
  ${breakpoints.phoneMax<ExpandableContainerProps>`
    display: ${props => (props.expanded ? 'inline' : 'none')};
    flex-direction: column;
  `}
`;

export type MenuItemProps = {
  isActive: boolean;
};

export const MenuItem = styled.span<MenuItemProps>`
  margin-left: 2rem;
  padding: 0.45rem 0.2rem 0.1rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: ${props => (props.isActive ? 'underline' : 'inherit')};
  ${breakpoints.tabletMax`
    margin-left: .8rem;
  `}
  ${breakpoints.phoneMax`
    display: block;
    text-align: right;
    padding-right: 1.25rem;
    font-size: 1.75rem;
    border-top: 1px solid #002e2a;
    margin: 0;
  `}

  &:hover {
    opacity: 0.75;
  }
`;
