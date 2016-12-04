import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Navbar from '.';

test('Navbar renders correctly', () => {
  const tree = renderer.create(
    <Navbar path={'somePath'}></Navbar>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('Navbar expands/collapses on click', () => {
  const navbar = shallow(
    <Navbar path={'somePath'}></Navbar>
  );

  expect(navbar.find('.show').length).toBe(0);

  navbar.find('.mobile').simulate('click');
  expect(navbar.find('.show').length).toBe(1);

  navbar.find('.mobile').simulate('click');
  expect(navbar.find('.show').length).toBe(0);
});