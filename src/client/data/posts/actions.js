import axios from 'axios';

import { POSTS_FETCH, POSTS_ADD } from './constants';

export const addPosts = (posts) => ({
  type: POSTS_ADD,
  payload: posts
});

export const fetchPosts = () => ({
  type: POSTS_FETCH,
  payload: axios.get('/api/posts')
});