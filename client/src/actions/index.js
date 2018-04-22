import {signin} from "../services/apiCalls";
import { CHANGE_AUTH } from "./types";

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export function signinUser(credentials) {
  return async function(dispatch) {
    await signin(credentials)
  }
}