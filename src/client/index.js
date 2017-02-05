import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './data/store';
import App from './components/App';

const store = createStore(window.__INITIAL_STATE__);
const appMount = document.getElementById('app-mount');
const sentryDNS = process.env.sentryDNS;

// App bootstrap
window.onload = () => {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <App/>
    </Provider>,
    appMount
  );
};

// Client error reporting - prod only
if (window.Raven) {
  window.Raven.config(sentryDNS).install();
}