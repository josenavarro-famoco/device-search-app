import {
  INCREMENT, DECREMENT,
  LOGIN, LOGOUT,
  CHANGE_TEXT,
} from './constants';

export const increment = () => {
  return {
    type: INCREMENT,
  }
}

export const decrement = () => {
  return {
    type: DECREMENT,
  }
}

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: {
      username,
      password,
    }
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const changeText = (text = '') => {
  const device = {
    famoco_id: '(01)03770004396078(21)4LZ',
    organization: {
      id: 3,
      name: 'Famoco Developers'
    }
  };
  return {
    type: CHANGE_TEXT,
    payload: {
      text,
      device: text.length > 0 ? device : {}, 
    }
  }
}
