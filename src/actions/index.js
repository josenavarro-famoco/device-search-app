import {
  INCREMENT, DECREMENT,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT,
  CHANGE_TEXT,
} from './constants';

import {
  saveAuthenticationCookies,
  getAuthenticationCookies,
  removeAuthenticationCookies,
} from '../utils';

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

export const login = () => {
  return {
    type: LOGIN,
  }
}

export const loginSuccess = () => {
  const auth = {
    access_token: 'Dx55Xm55KKypeEEhZRd4pJthiMWNxl',
    token_type: 'Bearer',
    expires_in: 36000,
    refresh_token: 'NwUtuoIFMltak8kq01d7rYv0XaX5um',
    scope: 'read write'
  }
  saveAuthenticationCookies(auth);
  const current = {
    username: 'jose.navarro@famoco.com',
    first_name: 'Jose Miguel',
    last_name: 'Navarro',
    email: 'jose.navarro@famoco.com',
    language: null
  }

  return {
    type: LOGIN_SUCCESS,
    payload: {
      data: current,
    }
  }
}

export const loginFail = () => {
  removeAuthenticationCookies();
  return {
    type: LOGIN_FAIL,
  }
}

export const logout = () => {
  removeAuthenticationCookies();
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

/*
* Logic actions
*/

export const performLogin = (username, password) => (dispatch) => {
  dispatch(login());
  const r = Math.floor((Math.random() * 10) + 1);
  console.log(r);
  if (r >= 5) {
    dispatch(loginSuccess());
  } else {
    dispatch(loginFail());
  }
}

export const checkUserSession = () => (dispatch) => {
  setTimeout(() => {
    const authCookies = getAuthenticationCookies();
    if (authCookies.size > 0) {
      dispatch(loginSuccess());
    } else {
      dispatch(logout())
    }
  }, 1000);
}
