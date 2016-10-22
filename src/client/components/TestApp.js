import React from 'react';

export default class TestApp extends React.Component {
  componentDidMount() {
    console.log('This is just a test!');
  }

  render() {
    return (
      <div>
        {'Just a test!'}
      </div>
    );
  }
}