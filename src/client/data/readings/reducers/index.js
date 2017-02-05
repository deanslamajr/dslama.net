import { 
  READINGS_FETCH, 
  READINGS_ADD,
  READINGS_FETCH_PENDING,
  READINGS_FETCH_FULFILLED, 
  READINGS_FETCH_REJECTED } from '../constants';

const reducers = {
  [READINGS_ADD]: (state, payload) => ({
    ...state,
    data: payload,
    isFetched: true
  }),
  [READINGS_FETCH_PENDING]: (state, payload) => ({
    ...state,
    isLoading: true
  }),
  [READINGS_FETCH_FULFILLED]: (state, payload) => ({
    ...state,
    data: payload.data,
    isLoading: false,
    isFetched: true
  }),
  [READINGS_FETCH_REJECTED]: (state, payload) => ({
    ...state,
    error: payload.response.data,
    isLoading: false
  })
};

export default (state = {}, { type, payload }) => {
  const actionReducer = reducers[type];
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state;
};