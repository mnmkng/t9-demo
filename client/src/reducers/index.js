import { combineReducers } from "redux";
import authenticationReducer from "./authentication";
import {reducer as form} from "redux-form";

const rootReducer = combineReducers({
  form,
  authenticated: authenticationReducer
});

export default rootReducer;
