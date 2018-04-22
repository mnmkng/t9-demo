import { combineReducers } from "redux";
import auth from "./authentication";
import {reducer as form} from "redux-form";

const rootReducer = combineReducers({
  form,
  auth
});

export default rootReducer;
