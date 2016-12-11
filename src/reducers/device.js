import { fromJS } from 'immutable';

import {
  CHANGE_TEXT,
} from '../actions/constants';

const initialState = fromJS({
  searchText: '',
  deviceInformation: fromJS({}),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return state
        .set('searchText', action.payload.text)
        .set('deviceInformation', fromJS(action.payload.device));
    default:
      return state;
  }
}
