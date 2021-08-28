import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
  InnerContainer,
  MenuItem,
  MiddleContainer,
  OuterContainer,
  EditModeBadge
} from './Navbar.styles';
import { Hamburger } from './hamburger';
import {useState as useEditModeState} from '../../contexts/EditModeState';

const getTitle = (isEditMode: boolean) => isEditMode ? 'edit' : 'dean slama';

const MENU_ITEMS: string[] = ['about', 'posts', 'projects', 'readings'];

type NavbarProps = {};

const getPathFromRoute: (route: string) => string = route => {
  const tokens = route.split('/');
  if (tokens[1] === '') {
    return 'about';
  }
  return tokens[1];
};

export const Navbar: React.FunctionComponent<NavbarProps> = ({}) => {
  const [editModeState, updateEditMode] = useEditModeState();
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

  const toggleEditModal = () => {
    if (editModeState.isActive) {
      updateEditMode({
        ...editModeState,
        showModal: !editModeState.showModal
      });
    }
  };

  return (
    <OuterContainer>
      <MiddleContainer>
        <span onClick={toggleEditModal}>
          {getTitle(editModeState.isActive)}
        </span>
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
