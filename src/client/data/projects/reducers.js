import {
  PROJECTS_FETCH_PENDING,
  PROJECTS_FETCH_FULFILLED,
  PROJECTS_FETCH_REJECTED,
  PROJECTS_ADD } from './constants'

const reducers = {
  [PROJECTS_ADD]: (state, payload) => ({
    ...state,
    data: payload,
    isFetched: true
  }),
  [PROJECTS_FETCH_PENDING]: (state, payload) => ({
    ...state,
    isLoading: true
  }),
  [PROJECTS_FETCH_FULFILLED]: (state, payload) => ({
    ...state,
    data: payload.data,
    isLoading: false,
    isFetched: true
  }),
  [PROJECTS_FETCH_REJECTED]: (state, payload) => ({
    ...state,
    error: payload.response.data,
    isLoading: false
  })
}

export default (state = {}, { type, payload }) => {
  const actionReducer = reducers[type]
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state
}
