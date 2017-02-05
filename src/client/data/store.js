import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import root from './reducers';

export default (initialState = {}) => {
  return createStore(
    root, 
    initialState,
    applyMiddleware(promiseMiddleware())
  );
}