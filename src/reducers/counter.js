import { fromJS } from 'immutable';

import {
  INCREMENT,
  DECREMENT,
} from '../actions/constants';

const initialState = fromJS({
  counter: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state.set('counter', state.get('counter') + 1);
    case DECREMENT:
      return state.set('counter', state.get('counter') - 1);
    default:
      return state;
  }
}
