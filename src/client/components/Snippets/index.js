import React from 'react';

export default class Snippets extends React.Component {
  componentDidMount() {
    // check global state if DB has been queried, if it hasn't then query DB for data
    // i.e. server rendered component just queried DB, we don't want to immediately query again from the client
  }

  componentWillUnmount() {
    // clear part of global state that says that DB has already been queried
  }

  render() {
    const { taco } = this.props;
    return (
      <div>
        { taco }
      </div>
    );
  }
}