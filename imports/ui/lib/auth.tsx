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
