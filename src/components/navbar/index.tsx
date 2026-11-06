import React from 'react';
import { useRouter } from 'next/router';
import {
  Anchor,
  Box,
  Button,
  Header,
  Nav,
  Menu,
  ResponsiveContext,
  Text,
} from 'grommet';
import { useState as useEditModeState } from '../../contexts/EditModeState';
import { parseInputFromConsole } from './parseInputFromConsole';
import {
  useFetchViewerQuery,
  useLogoutMutation,
} from '../../graphql/generated/ops';

const getTitle = () => 'dean slama';

const MENU_ITEMS: string[] = ['about', 'posts', 'projects', 'readings'];

const getPathFromRoute: (route: string) => string = route => {
  const tokens = route.split('/');
  if (tokens[1] === '') {
    return 'about';
  }
  return tokens[1];
};

export const Navbar: React.FC = () => {
  const [editModeState, updateEditMode] = useEditModeState();
  const router = useRouter();
  // Derived on every render, so browser back and forward update the menu.
  const activeItem = getPathFromRoute(router.pathname);
  const { data: viewerData } = useFetchViewerQuery({
    skip: !editModeState.isActive,
    ssr: false,
    fetchPolicy: 'network-only',
  });
  const [logout] = useLogoutMutation({ refetchQueries: ['FetchViewer'] });

  const onLinkClick: (item: string) => void = item => {
    const newPath = item.toLowerCase();

    const url = newPath !== 'about' ? `/${newPath}` : '/';

    router.push(url);
  };

  const toggleModalVisibility = () => {
    const resolvedInputFromConsole = parseInputFromConsole();

    updateEditMode({
      ...editModeState,
      showModal: !editModeState.showModal,
      resolvedInputFromConsole,
    });
  };

  return (
    <Box fill direction="row" justify="center">
      <Header background="brand" elevation="medium" pad="small" width="xxlarge">
        <Box direction="row">
          <Text
            size="xlarge"
            weight="bold"
            margin={{ right: 'small' }}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            onClick={toggleModalVisibility}
            onKeyDown={(event: React.KeyboardEvent) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleModalVisibility();
              }
            }}>
            {getTitle()}
          </Text>
          {editModeState.isActive && viewerData?.viewer && (
            <Button plain label="logout" onClick={() => logout()} />
          )}
        </Box>
        <ResponsiveContext.Consumer>
          {responsive =>
            responsive === 'small' ? (
              <Menu
                items={MENU_ITEMS.map(item => ({
                  label: item,
                  onClick: () => onLinkClick(item),
                }))}
              />
            ) : (
              <Nav direction="row">
                {MENU_ITEMS.map(item => (
                  <Anchor
                    key={item}
                    as="span"
                    label={item}
                    onClick={() => onLinkClick(item)}
                    weight={item === activeItem ? 'bold' : 'normal'}
                  />
                ))}
              </Nav>
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
    </Box>
  );
};
