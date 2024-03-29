import { Meteor } from "meteor/meteor";
const { Accounts } = require("meteor/accounts-base");
import Cookies from "js-cookie";

export type AuthInfo = { username: string; password: string };

export const signUp = async (authInfo: AuthInfo) => {
  try {
    await Accounts.createUserAsync(authInfo);
    return;
  } catch (error) {
    throw {
      reason: error.reason,
      error: error.error,
    };
  }
};

export const logIn = async (authInfo: AuthInfo) => {
  /**
   * @important
   * Wrap the login method with a Promise to support
   * async handlers and error caching
   */
  await new Promise((resolve, reject) => {
    Meteor.loginWithPassword(
      { username: authInfo.username },
      authInfo.password,
      (error) => {
        if (!error) {
          saveCookies(authInfo);
          resolve(undefined);
        } else {
          reject({
            reason: error.reason,
            error: error.error,
          });
        }
      }
    );
  });
};

export const logOut = async () => {
  /**
   * @important
   * Wrap the login method with a Promise to support
   * async handlers and error caching
   */
  await new Promise((resolve, reject) => {
    Meteor.logout((error) => {
      if (!error) {
        removeCookies();
        resolve(undefined);
      } else {
        reject({
          reason: error.reason,
          error: error.error,
        });
      }
    });
  });
};

const COOKIE_PREFIX = "wheater-";

export const tryLogInWithCookies = async () => {
  const authInfo: AuthInfo = {
    password: Cookies.get(COOKIE_PREFIX + "password"),
    username: Cookies.get(COOKIE_PREFIX + "username"),
  };
  return await logIn(authInfo);
};

export const saveCookies = (authInfo: AuthInfo) => {
  Cookies.set(COOKIE_PREFIX + "password", authInfo.password);
  Cookies.set(COOKIE_PREFIX + "username", authInfo.username);
};
export const removeCookies = () => {
  Cookies.remove(COOKIE_PREFIX + "password");
  Cookies.remove(COOKIE_PREFIX + "username");
};
