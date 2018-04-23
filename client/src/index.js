import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";
import './index.css';

import App from "./components/App";
import reducers from './reducers';
import {AUTH_USER, UNAUTH_USER} from "./actions/types";
import {refreshAuth} from "./services/apiCalls";


async function main() {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  try {
    await refreshAuth();
    store.dispatch({type: AUTH_USER})
  } catch (e) {
    store.dispatch({type: UNAUTH_USER})
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

main();