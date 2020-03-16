import React from 'react';

import { OuterContainer, Line } from './Hamburger.styles';
import { ExpandableContainerProps } from '../Navbar.styles';

type HamburgerProps = ExpandableContainerProps & {
  onMenuClick: () => void;
};

export const Hamburger: React.FunctionComponent<HamburgerProps> = ({
  onMenuClick,
  expanded,
}) => {
  return (
    <OuterContainer onClick={onMenuClick}>
      <Line expanded={expanded} />
      <Line expanded={expanded} />
      <Line expanded={expanded} />
    </OuterContainer>
  );
};

export default Hamburger;
