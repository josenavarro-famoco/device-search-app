import { fromJS } from 'immutable';

import {
  LOGIN, LOGOUT,
} from '../actions/constants';

const initialState = fromJS({
  user: undefined,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return state.set('user', fromJS(action.payload));
    case LOGOUT:
      return state.set('user', undefined);
    default:
      return state;
  }
}
