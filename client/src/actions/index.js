import { signin, refreshAuth, signout } from "../services/apiCalls";
import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from "./types";

export function signinUser(credentials, callback) {
  return async function(dispatch) {
    try {
      await signin(credentials);
      dispatch({ type: AUTH_USER });
      callback(null);
    } catch (e) {
      dispatch(authError("Invalid username or password."));
      callback(e);
    }
  };
}

export function signoutUser() {
  return async function(dispatch) {
    try {
      await signout();
    } catch (e) {
      // do nothing atm
    }
    dispatch({ type: UNAUTH_USER });
  };
}

export function checkSession() {
  return async function(dispatch) {
    try {
      await refreshAuth();
      dispatch({ type: AUTH_USER });
    } catch (e) {
      dispatch({ type: UNAUTH_USER });
    }
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function clearAuthError() {
  return {
    type: AUTH_ERROR,
    payload: null
  };
}
