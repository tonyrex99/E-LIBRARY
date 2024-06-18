/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';
import { AuthValue } from '@/services/types/responses';

const TOKEN_NAME = 'userToken';
const REFRESH_TOKEN_NAME = 'userTokenReresh';
const USER_COOKIE_NAME = 'userData';

export function checkAuthToken() {
  const token = Cookies.get(TOKEN_NAME);

  return token;
}

export function getAuthToken() {
  const data = Cookies.get(TOKEN_NAME);
  let token = false;

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData && parsedData.token) {
        token = parsedData.token;
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  return token;
}

export function getUserRole() {
  const data = Cookies.get(TOKEN_NAME);
  let token = 'false';

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData && parsedData.role) {
        token = parsedData.role;
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  return token;
}

export function getUserDept() {
  const data = Cookies.get(TOKEN_NAME);
  let token = 'false';

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData && parsedData.department) {
        token = parsedData.department;
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  return token;
}

export function getRefreshToken() {
  const token = Cookies.get(REFRESH_TOKEN_NAME);

  return token;
}

export function removeAuthToken() {
  document.cookie = `${TOKEN_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  Cookies.remove(TOKEN_NAME);
}

export function setAuthToken(tokenValue: AuthValue) {
  Cookies.set(TOKEN_NAME, JSON.stringify(tokenValue!), { expires: 1 });
}

export function setRefreshToken(tokenValue: string) {
  Cookies.set(REFRESH_TOKEN_NAME, tokenValue);
}

export function getCookie(name: string) {
  const token = Cookies.get(name);

  return token;
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}

export function setCookie(name: string, value: string | object | any) {
  Cookies.set(name, value);
}

export function setCookieWithExpireTime(
  name: string,
  value: string | object | any,
  day: number = 2,
) {
  Cookies.set(name, value, { expires: day });
}

export function saveUserToCookies(user: any) {
  if (typeof user === 'object') {
    Cookies.set(USER_COOKIE_NAME, JSON.stringify(user));
  } else {
    console.error('Invalid user object. User not saved to cookies.');
  }
}

export function getUserFromCookies() {
  const userCookie = Cookies.get(USER_COOKIE_NAME);
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      if (typeof user === 'object') {
        return user;
      }
    } catch (error) {
      console.error('Error parsing user data from cookies:', error);
    }
  }
  return null;
}

export function removeUserFromCookies() {
  Cookies.remove(USER_COOKIE_NAME);
}
