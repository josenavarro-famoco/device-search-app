import counter from './counter';
import user from './user';
import device from './device';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  counter,
  device,
  user,
});

export default rootReducer;
