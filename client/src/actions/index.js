import { signin, refreshAuth, signout, signup } from "../services/apiCalls";
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

export function signupUser(credentials, callback) {
  return async function(dispatch) {
    try {
      await signup(credentials);
      dispatch({ type: AUTH_USER });
      callback(null);
    } catch (e) {
      if (e.response.status === 422) {
        dispatch(authError(e.response.data.message));
      } else {
        dispatch(authError("Sorry, we're unable to sign you up right now!"));
      }
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
