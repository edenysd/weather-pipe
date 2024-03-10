const { Accounts } = require("meteor/accounts-base");
import { Meteor } from "meteor/meteor";

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
  Meteor.loginWithPassword(
    { username: authInfo.username },
    authInfo.password,
    (error) => {
      if (!error) {
        //@todo LOGIC for saved keys
      } else {
        return {
          reason: error.reason,
          error: error.error,
        };
      }
    }
  );
};

export const tryLogInWithCookies = () => {};
