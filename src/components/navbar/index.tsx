import React from 'react';
import Link from 'next/link';
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

const getPathFromItem: (item: string) => string = item =>
  item === 'about' ? '/' : `/${item}`;

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
  // Pages are static, so the viewer is known only in the browser.
  const { data: viewerData } = useFetchViewerQuery({
    ssr: false,
    fetchPolicy: 'network-only',
  });
  const [logout] = useLogoutMutation({ refetchQueries: ['FetchViewer'] });

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
          {viewerData?.viewer && (
            <Button
              plain
              label="logout"
              a11yTitle={`log out ${viewerData.viewer.username}`}
              onClick={() => logout()}
            />
          )}
        </Box>
        <ResponsiveContext.Consumer>
          {responsive =>
            responsive === 'small' ? (
              <Menu
                items={MENU_ITEMS.map(item => ({
                  label: item,
                  href: getPathFromItem(item),
                  onClick: (event: React.MouseEvent) => {
                    event.preventDefault();
                    router.push(getPathFromItem(item));
                  },
                }))}
              />
            ) : (
              <Nav direction="row">
                {MENU_ITEMS.map(item => (
                  <Link key={item} href={getPathFromItem(item)} passHref>
                    <Anchor
                      label={item}
                      weight={item === activeItem ? 'bold' : 'normal'}
                    />
                  </Link>
                ))}
              </Nav>
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
    </Box>
  );
};
