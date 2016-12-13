import {
  INCREMENT, DECREMENT,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT,
  SEARCH_DEVICE, SEARCH_DEVICE_SUCCESS, SEARCH_DEVICE_FAIL,
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

export const searchDevice = () => {
  return {
    type: SEARCH_DEVICE,
  }
}

export const searchDeviceSuccess = (data) => {
  return {
    type: SEARCH_DEVICE_SUCCESS,
    payload: {
      data,
    }
  }
}

export const searchDeviceFail = (errors) => {
  return {
    type: SEARCH_DEVICE_FAIL,
    payload: {
      errors,
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
      if (data.error) {
        data.error.response.json()
          .then((errors) => {
            dispatch(loginFail(errors));
          }).catch((errors) => {
            dispatch(loginFail(errors));
          })
      } else {
        saveAuthenticationCookies(data.data);
        dispatch(checkUserSession());
      }
    })
    .catch((error) => {
      dispatch(loginFail(error));
    });
}

/*
* Device actions
*/

export const performSearchDevice = (id) => (dispatch) => {
  dispatch(searchDevice());
  const authCookies = getAuthenticationCookies();
  const endpoint = `/api/1.0/devices/${id}`;

  if (authCookies.size > 0 && authCookies.has('token_type') && authCookies.has('access_token')) {
    const headers = {
      Authorization: `${authCookies.get('token_type')} ${authCookies.get('access_token')}`,
    }
    request(endpoint, { headers })
      .then((data) => {
        if (data.error) {
          data.error.response.json()
            .then((error) => {
              dispatch(searchDeviceFail(error.errors));
            }).catch((error) => {
              dispatch(searchDeviceFail(error));
            })
        } else {
          dispatch(searchDeviceSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(searchDeviceFail(error));
      });
  }
}
