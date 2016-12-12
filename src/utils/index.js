import cookie from 'react-cookie';
import { fromJS } from 'immutable';

export const saveAuthenticationCookies = (data) => {
  const options = {};
  if (data.expires_in) {
    options.maxAge = data.expires_in;
  }
  cookie.save('auth', data, options);
}

export const getAuthenticationCookies = () => {
  const authCookies = cookie.load('auth');
  return authCookies ? fromJS(authCookies) : fromJS({});
}

export const removeAuthenticationCookies = () => {
  cookie.remove('auth');
}
