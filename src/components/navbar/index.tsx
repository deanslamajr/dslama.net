import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Anchor,
  Box,
  Header,
  Nav,
  Menu,
  ResponsiveContext,
  Text
} from 'grommet';
import {useState as useEditModeState} from '../../contexts/EditModeState';

const getTitle = () => 'dean slama';

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
    const parseUnsafeInput = (unsafeInput: unknown) => {
      type Post = NonNullable<typeof editModeState.postsFromConsole>[number];

      const parsedPostsFromUnsafeInput = [] as Post[];

      if (unsafeInput && Array.isArray(unsafeInput)) {
        unsafeInput.forEach(possiblyAPost => {
          if (
            typeof possiblyAPost === 'object' &&
            typeof possiblyAPost.url === 'string' &&
            typeof possiblyAPost.title === 'string' &&
            typeof possiblyAPost.snippet === 'string' &&
            typeof possiblyAPost.originalPublishDate === 'number'
          ) {
            parsedPostsFromUnsafeInput.push({
              title: possiblyAPost.title,
              originalPublishDate: possiblyAPost.originalPublishDate,
              url: possiblyAPost.url,
              snippet: possiblyAPost.snippet
            } as Post);
          }
        });
      }

      return parsedPostsFromUnsafeInput;
    }

    // @ts-ignore
    const postsFromConsole = parseUnsafeInput(window.__postsFromConsole);
    
    updateEditMode({
      ...editModeState,
      showModal: !editModeState.showModal,
      postsFromConsole
    });
  }

  const toggleEditMode = () => {
    updateEditMode({
      ...editModeState,
      isActive: !editModeState.isActive
    });
  };

  return (
    <Box
      fill
      direction="row"
      justify="center"
    >
      <Header
        background="brand"
        elevation="medium"
        pad="small"
        width="xxlarge"
      >
        <Box
          direction="row"
        >
          <Text
            size="xlarge"
            weight="bold"
            margin={{right: 'small'}}
            onClick={toggleModalVisibility}
          >
            {getTitle()}
          </Text>
        </Box>
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
                      key={item}
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
    </Box>
  );
};
