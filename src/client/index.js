import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const sentryDNS = process.env.sentryDNS;

// App bootstrap
window.onload = () => {
  ReactDOM.render(<App/>, document.getElementById('app-mount'));
};

// Client error reporting - prod only
if (window.Raven) {
  window.Raven.config(sentryDNS).install();
}