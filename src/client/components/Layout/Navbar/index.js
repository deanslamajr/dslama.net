import React from 'react';
import { browserHistory } from 'react-router';

import Navbar from './navbar';

export default class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this._onMenuClick = this._onMenuClick.bind(this);
    this._onLinkClick = this._onLinkClick.bind(this);

    this.state = {
      expanded: false
    };
  }

  _onMenuClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  _onLinkClick(item) {
    const path = item.toLowerCase();

    this.setState({ 
      expanded: false,
      activeItem: path
    });

    browserHistory.push(`/${path}`);
  }

  componentWillMount() {
    // set the activeItem i.e. active view
    const { currentPath, menuItems } = this.props;

    let activeItem = currentPath.split('/')[1];

    activeItem = activeItem
      ? activeItem.toLowerCase()
      : menuItems[0].toLowerCase();

    this.setState({ activeItem });
  }

  render() {
    const { title, menuItems } = this.props;
    return (
      <Navbar
        title={title}
        activeItem={this.state.activeItem}
        expanded={this.state.expanded}
        onMenuClick={this._onMenuClick}
        onLinkClick={this._onLinkClick}
        menuItems={menuItems}
      />
    );
  }
};

NavBarContainer.propTypes = {
  currentPath: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  menuItems: React.PropTypes.arrayOf(React.PropTypes.string)
}