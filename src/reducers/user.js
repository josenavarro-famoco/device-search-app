import { fromJS } from 'immutable';

// import {
//   INCREMENT,
//   DECREMENT,
// } from '../actions/constants';

const initialState = fromJS({
  user: undefined,
});

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
