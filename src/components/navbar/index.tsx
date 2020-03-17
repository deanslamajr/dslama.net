import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
  InnerContainer,
  MenuItem,
  MiddleContainer,
  OuterContainer,
} from './Navbar.styles';
import { Hamburger } from './hamburger';

const TITLE = 'dean slama';
const MENU_ITEMS: string[] = ['about', 'posts', 'projects', 'readings'];

type NavbarProps = {};

const getPathFromRoute: (route: string) => string = route => {
  const tokens = route.split('/');
  if (tokens[1] === '') {
    return 'about';
  }
  return tokens[1];
};

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
  const router = useRouter();
  const path = getPathFromRoute(router.route);

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(path);

  const onLinkClick: (item: string) => void = item => {
    const newPath = item.toLowerCase();

    setIsExpanded(false);
    setActiveItem(newPath);

    const url = newPath !== 'about' ? `/${newPath}` : '/';

    router.push(url);
  };

  const onMenuClick: () => void = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <OuterContainer>
      <MiddleContainer>
        <span>{TITLE}</span>
        <Hamburger onMenuClick={onMenuClick} expanded={isExpanded} />
      </MiddleContainer>
      <InnerContainer expanded={isExpanded}>
        {MENU_ITEMS.map(item => (
          <MenuItem
            key={item}
            onClick={() => onLinkClick(item)}
            isActive={activeItem === item.toLowerCase()}>
            {item}
          </MenuItem>
        ))}
      </InnerContainer>
    </OuterContainer>
  );
};
