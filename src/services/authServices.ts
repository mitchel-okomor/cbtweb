import Cookies from 'universal-cookie';
import { removeStorageItem } from '../helpers/utilities';

// Cookie service
export const cookieService = () => {
  //Initialize Cookie
  const cookies = new Cookies();

  // set Token
  const setToken = (key:string, value:string) => {
    return cookies.set(key, value);
  };

  // Get Token
  const getToken = () => {
    return cookies.get('access_token');
  };

  // Remove Token
  const removeToken = (key:string) => {
    cookies.remove(key);
  };

  // Export defined functions
  return {
    getToken: () => getToken(),
    setToken: (key:string, value:string) => setToken(key, value),
    removeToken: (key:string) => removeToken(key)
  };
};

export const isAuthenticated = () => {
  return !!cookieService().getToken();
};

export const getAccessToken = () => {
  return cookieService().getToken;
};

export const removeAccessToken = (key:string) => {
  cookieService().removeToken(key);
};

/**
 * Wipe Application Data
 */
export const clearAppData = () => {
  cookieService().removeToken('access_token');
  removeStorageItem('user');
};
