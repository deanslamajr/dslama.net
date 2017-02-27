import { combineReducers } from 'redux';

import readings from './readings/reducers';
import about from './about/reducers';

export default combineReducers({
  readings,
  about
});
