import React from 'react';

import SnippetsContainer from './SnippetsContainer';

export default class SnippetsParentContainer extends React.Component {
  render() {
    // If this is a child path, render that instead of the parent component
    const { children } = this.props;

    return children
      ? children
      : <SnippetsContainer/>
  }
}