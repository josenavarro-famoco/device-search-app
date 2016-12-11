import counter from './counter';
import auth from './auth';
import device from './device';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  counter,
  device,
  auth,
});

export default rootReducer;
