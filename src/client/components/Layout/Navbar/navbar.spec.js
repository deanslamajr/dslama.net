/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import Navbar from './navbar'
import NavbarContainer from '.'

const title = 'test title'
const menuItems = ['first', 'second', 'third']

describe('Navbar', () => {
  const expanded = false
  const onMenuClick = jest.fn()
  const onLinkClick = jest.fn()
  const element = (
    <Navbar
      title={title}
      menuItems={menuItems}
      expanded={expanded}
      onMenuClick={onMenuClick}
      onLinkClick={onLinkClick}
    />
  )

  let navbar

  beforeEach(() => {
    navbar = shallow(element)

    onMenuClick.mockReset()
    onLinkClick.mockReset()
  })

  it('should render', () => {
    const tree = renderer.create(element).toJSON()

    expect(tree).toMatchSnapshot()
  })

  xit('should properly handle menu click events', () => {
    expect(onMenuClick.mock.calls.length).toBe(0)

    navbar.find('.mobile').simulate('click')

    expect(onMenuClick.mock.calls.length).toBe(1)
  })

  it('should properly handle link click events', () => {
    expect(onLinkClick.mock.calls.length).toBe(0)

    navbar.find('.inner-container').childAt(0).simulate('click')

    expect(onLinkClick.mock.calls.length).toBe(1)
  })
})

describe('Navbar container', () => {
  const currentPath = '/currentPath'

  const element = (
    <NavbarContainer
      currentPath={currentPath}
      title={title}
      menuItems={menuItems}
    />
  )

  let navbarContainer

  beforeEach(() => {
    navbarContainer = mount(element)
  })

  it('should render', () => {
    const tree = renderer.create(element).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should expand/collaps on click', () => {
    expect(navbarContainer.find('.show').length).toBe(0)

    navbarContainer.find('.mobile').simulate('click')
    expect(navbarContainer.find('.show').length).toBe(1)

    navbarContainer.find('.mobile').simulate('click')
    expect(navbarContainer.find('.show').length).toBe(0)
  })

  xit('should make a clicked item active while inactivating all other items', () => {
    expect(navbarContainer.find('.inner-container').childAt(0).is('.active')).toBeFalsy()

    navbarContainer.find('.inner-container').childAt(0).simulate('click')

    expect(navbarContainer.find('.inner-container').childAt(0).is('.active')).toBeTruthy()
  })
})
