import { fromJS } from 'immutable';

import {
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT,
} from '../actions/constants';

const initialState = fromJS({
  user: undefined,
  loading: false,
  errors: false,
  ready: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return state
      .set('loading', true)
      .set('errors', false);
    case LOGIN_SUCCESS:
      return state
        .set('ready', true)
        .set('loading', false)
        .set('user', fromJS(action.payload.data));
    case LOGIN_FAIL:
      return state
        .set('loading', false)
        .set('errors', true);
    case LOGOUT:
      return state
        .set('ready', true)
        .set('user', undefined);
    default:
      return state;
  }
}
