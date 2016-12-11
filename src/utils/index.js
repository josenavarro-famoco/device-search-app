import cookie from 'react-cookie';
import { fromJS } from 'immutable';

export const saveAuthenticationCookies = (data) => {
  console.log('saved data', data)
  const options = {};
  if (data.expires_in) {
    options.maxAge = data.expires_in;
  }
  cookie.save('auth', data, options);
  // maxAge Example
  // reactCookie.save("token", "token-value", {
  //    maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
  // });
  // reactCookie.save("token", "token-value", {
  //    expires: tomorrow // Will expire after 24hr from setting (value is in Date object)
  // });
}

export const getAuthenticationCookies = () => {
  const authCookies = cookie.load('auth');
  console.log(authCookies)
  return authCookies ? fromJS(authCookies) : fromJS({});
}

export const removeAuthenticationCookies = () => {
  console.log('remove data')
  cookie.remove('auth');

}
