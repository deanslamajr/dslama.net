import React from 'react';
import renderer from 'react-test-renderer';

import Navbar from '.';

test('Navbar renders correctly', () => {
  const tree = renderer.create(
    <Navbar path={'somePath'}></Navbar>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});