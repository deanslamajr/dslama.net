import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Navbar from './navbar';
import NavbarContainer from '.';

const title = 'test title';
const menuItems = ['first', 'second', 'third'];

describe('Navbar', () => {
  const expanded = false;
  const onMenuClick = jest.fn();
  const onLinkClick = jest.fn();
  const element = (
    <Navbar
      title={title}
      menuItems={menuItems}
      expanded={expanded}
      onMenuClick={onMenuClick}
      onLinkClick={onLinkClick}
    />
  );

  let navbar;

  beforeEach(() => {
    navbar = shallow(element);

    onMenuClick.mockReset();
    onLinkClick.mockReset();
  });

  it('should render', () => {
    const tree = renderer.create(element).toJSON();

    expect(tree).toMatchSnapshot();
  });

  xit('should properly handle click events', () => {
    navbar.find(`[key=${menuItems[0]}]`).simulate('click');
    expect(onMenuClick.calledOnce).to.equal(true);

    
    expect(onLinkClick.calledOnce).to.equal(true);
  });
});

describe('Navbar container', () => {
  const currentPath = '/currentPath';

  const element = (
    <NavbarContainer
      currentPath={currentPath}
      title={title}
      menuItems={menuItems}
    />
  );

  let navbarContainer;

  beforeEach(() => {
    navbarContainer = mount(element);
  });

  it('should render', () => {
    const tree = renderer.create(element).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should expand/collaps on click', () => {
    expect(navbarContainer.find('.show').length).toBe(0);

    navbarContainer.find('.mobile').simulate('click');
    expect(navbarContainer.find('.show').length).toBe(1);

    navbarContainer.find('.mobile').simulate('click');
    expect(navbarContainer.find('.show').length).toBe(0);
  });

  xit('should make a clicked item active while inactivating all other items', () => {
    navbarContainer.find(`[key=${menuItems[0]}]`).simulate('click');
  });
});