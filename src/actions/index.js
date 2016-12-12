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

import request from '../utils/request';
import querystring from 'querystring';

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

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      data,
    }
  }
}

export const loginFail = (errors) => {
  removeAuthenticationCookies();
  return {
    type: LOGIN_FAIL,
    payload: {
      errors,
    }
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

export const checkUserSession = () => (dispatch) => {
  const authCookies = getAuthenticationCookies();
  const endpoint = '/api/1.0/users/current/';
  if (authCookies.size > 0 && authCookies.has('token_type') && authCookies.has('access_token')) {
    const headers = {
      Authorization: `${authCookies.get('token_type')} ${authCookies.get('access_token')}`,
    }
    request(endpoint, { headers })
      .then((data) => {
        dispatch(loginSuccess(data.data));
      })
      .catch((error) => {
        dispatch(loginFail(error));
      });
    dispatch(loginSuccess());
  } else {
    dispatch(logout())
  }
}

export const performLogin = (username, password) => (dispatch) => {
  dispatch(login());

  const endpoint = '/api/oauth2/token/';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: querystring.encode({
      username: username,
      password: password,
      client_id: 'UrsuUnMBojaRkoQlhEyM7Qse3kirP0yswXdivLFa',
      grant_type: 'password',
    }),
  }

  request(endpoint, options)
    .then((data) => {
      saveAuthenticationCookies(data.data);
      dispatch(checkUserSession());
    })
    .catch((error) => {
      dispatch(loginFail(error));
    });
}
