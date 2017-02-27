import { 
  ABOUT_ADD,
  ABOUT_FETCH, 
  ABOUT_FETCH_PENDING,
  ABOUT_FETCH_FULFILLED, 
  ABOUT_FETCH_REJECTED } from './constants';

const reducers = {
  [ABOUT_ADD]: (state, payload) => ({
    ...state,
    data: payload,
    isFetched: true
  }),
  [ABOUT_FETCH_PENDING]: (state, payload) => ({
    ...state,
    isLoading: true
  }),
  [ABOUT_FETCH_FULFILLED]: (state, payload) => ({
    ...state,
    data: payload.data,
    isLoading: false,
    isFetched: true
  }),
  [ABOUT_FETCH_REJECTED]: (state, payload) => ({
    ...state,
    error: payload.response.data,
    isLoading: false
  })
};

export default (state = {}, { type, payload }) => {
  const actionReducer = reducers[type];
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state;
};