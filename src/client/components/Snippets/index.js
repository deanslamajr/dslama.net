import React from 'react';

import SnippetsContainer from './SnippetsContainer';

export default class SnippetsParentContainer extends React.Component {
  render() {
    const { children: addSnippetComponent } = this.props;

    return addSnippetComponent || <SnippetsContainer/>
  }
}