import styled from 'styled-components';

import { breakpoints, shadow } from '../layouts';

export const OuterContainer = styled.div`
  ${shadow()}
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts};
  background-color: #004741;
  color: ${props => props.theme.colors.text};
  border-radius: 2px;
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.highest};
  ${breakpoints.tabletMax`
    margin-top: 0;
    border-radius: 0;
  `}
  ${breakpoints.phoneMax`
    margin-top: 0;
    flex-direction: column;
    padding: .5rem .2rem 0;
  `}
`;

export const MiddleContainer = styled.span`
  display: flex;
  font-size: 2rem;
  justify-content: space-between;
  padding: 0.4rem 0.2rem 0;
  cursor: default;
  ${breakpoints.phoneMax`
    padding: 0;
  `}
`;

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
