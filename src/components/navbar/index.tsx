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
  return tokens.length > 1 ? tokens[1] : '';
};

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
  const router = useRouter();
  const path = getPathFromRoute(router.route);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(path);

  const onLinkClick: (item: string) => void = item => {
    const path = item.toLowerCase();

    setIsExpanded(false);
    setActiveItem(path);

    const newPath = path !== 'about' ? `/${path}` : '/';

    router.push(newPath);
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
