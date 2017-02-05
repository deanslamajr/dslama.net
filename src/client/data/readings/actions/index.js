import axios from 'axios';

import { READINGS_ADD, READINGS_FETCH } from '../constants';

export const addReadings = (readings) => ({
  type: READINGS_ADD,
  payload: readings
});

export const fetchReadings = () => ({
  type: READINGS_FETCH,
  payload: axios.get('/api/readings')
});