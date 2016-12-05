import React from 'react';

import Presentation from './presentation';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.onMenuClick = this.onMenuClick.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);

    this.state = {
      expanded: false
    };
  }

  onMenuClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  onLinkClick(item) {
    this.setState({ 
      expanded: false,
      activeItem: item.toLowerCase()
    });
  }

  componentWillMount() {
    // set the activeItem
    // e.g. '/Posts/12' => path = 'posts'
    const { currentPath } = this.props;

    let activeItem = currentPath.split('/')[1];

    if (activeItem) {
      activeItem = activeItem.toLowerCase()
      this.setState({ activeItem });
    }
  }

  render() {
    return (
      <Presentation 
        activeItem={this.state.activeItem}
        expanded={this.state.expanded}
        onMenuClick={this.onMenuClick}
        onLinkClick={this.onLinkClick}
        menuItems={this.props.menuItems}
      />
    );
  }
};

NavBar.propTypes = {
  currentPath: React.PropTypes.string.isRequired,
  menuItems: React.PropTypes.arrayOf(React.PropTypes.string)
}