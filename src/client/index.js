import React from 'react';
import ReactDOM from 'react-dom';
import TestApp from './components/TestApp';

window.onload = () => {
  ReactDOM.render(<TestApp/>, document.getElementById('app-mount'));
};