import {signin} from "../services/apiCalls";
import { AUTH_ERROR, AUTH_USER } from "./types";

export function signinUser(credentials, history) {
  return async function(dispatch) {
    try {
      await signin(credentials);
      dispatch({type: AUTH_USER});
      history.push("/");
    } catch (e) {
      dispatch(authError("Invalid username or password."))
    }
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function clearAuthError() {
  return {
    type: AUTH_ERROR,
    payload: null
  }
}