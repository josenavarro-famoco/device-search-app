import {
  INCREMENT, DECREMENT,
  LOGIN, LOGOUT,
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
