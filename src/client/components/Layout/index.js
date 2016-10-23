import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <h1>NavBar</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/stuff">Stuff</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}