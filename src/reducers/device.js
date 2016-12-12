import { fromJS } from 'immutable';

import {
  SEARCH_DEVICE, SEARCH_DEVICE_SUCCESS, SEARCH_DEVICE_FAIL,
} from '../actions/constants';

const initialState = fromJS({
  loading: false,
  errors: false,
  deviceInformation: fromJS({}),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DEVICE:
      return state
        .set('loading', true)
        .set('errors', false)
        .set('deviceInformation', fromJS({}));
    case SEARCH_DEVICE_SUCCESS:
      return state
        .set('loading', false)
        .set('deviceInformation', fromJS(action.payload.data));
    case SEARCH_DEVICE_FAIL:
      return state
        .set('loading', false)
        .set('errors', true)
        .set('errorMessage', action.payload.errors);
    default:
      return state;
  }
}
