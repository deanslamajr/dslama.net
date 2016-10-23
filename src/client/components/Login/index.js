import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div>
          <input type='text' placeholder='name' />
          <input type='text' placeholder='password' />
      </div>
    );
  }
}