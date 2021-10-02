import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  TitleBox
} from './Navbar.styles';
import {
  Anchor,
  Header,
  Nav,
  Menu,
  ResponsiveContext,
} from 'grommet';
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
  const [activeItem, setActiveItem] = useState(path);

  const onLinkClick: (item: string) => void = item => {
    const newPath = item.toLowerCase();
    setActiveItem(newPath);

    const url = newPath !== 'about' ? `/${newPath}` : '/';

    router.push(url);
  };

  const toggleModalVisibility = () => {
    if (editModeState.isActive) {
      updateEditMode({
        ...editModeState,
        showModal: !editModeState.showModal
      });
    }
  }

  const toggleEditMode = () => {
    updateEditMode({
      ...editModeState,
      isActive: !editModeState.isActive
    });
  };

  return (
    <Header
      background="brand"
      elevation="medium"
      pad="small"
    >
      <TitleBox
        direction="row"
        align="center"
        gap="small"
        onClick={toggleEditMode}
      >
        {getTitle(editModeState.isActive)}
      </TitleBox>
      {
        editModeState.isActive && (
          <TitleBox
            direction="row"
            align="center"
            gap="small"
            onClick={toggleModalVisibility}
          >
            {editModeState.showModal
              ? 'Hide'
              : 'Open'
            }
          </TitleBox>
        )
      }
      <ResponsiveContext.Consumer>
        {responsive =>
          responsive === 'small' ? (
            <Menu
              items={MENU_ITEMS.map(item => (
                { label: item, onClick: () => onLinkClick(item) }
              ))}
            />
          ) : (
            <Nav direction="row">
              {
                MENU_ITEMS.map(item => (
                  <Anchor
                    as="span"
                    label={item}
                    onClick={() => onLinkClick(item)}
                    weight={(
                      item === activeItem
                        ? 'bold'
                        : 'normal'
                    )}
                  />
                ))
              }
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};
