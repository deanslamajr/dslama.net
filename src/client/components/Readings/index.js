import React from 'react';

import ReadingsContainer from './ReadingsContainer';

export default class ReadingsParentContainer extends React.Component {
  render() {
    const { children: addReadingsComponent } = this.props;

    return addReadingsComponent || <ReadingsContainer/>
  }
}