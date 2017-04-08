import {
  POSTS_FETCH_PENDING,
  POSTS_FETCH_FULFILLED,
  POSTS_FETCH_REJECTED,
  POSTS_ADD } from './constants'

const reducers = {
  [POSTS_ADD]: (state, payload) => ({
    ...state,
    data: payload,
    isFetched: true
  }),
  [POSTS_FETCH_PENDING]: (state, payload) => ({
    ...state,
    isLoading: true
  }),
  [POSTS_FETCH_FULFILLED]: (state, payload) => ({
    ...state,
    data: payload.data,
    isLoading: false,
    isFetched: true
  }),
  [POSTS_FETCH_REJECTED]: (state, payload) => ({
    ...state,
    error: payload.response.data,
    isLoading: false
  })
}

export default (state = {}, { type, payload }) => {
  const actionReducer = reducers[type]
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state
}
