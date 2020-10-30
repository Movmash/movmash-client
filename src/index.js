import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { logoutUser, getUserData } from "./redux/actions/userAction";
import { SET_UNAUTHENTICATED } from "./redux/types";
import jwtDecode from "jwt-decode";
import store from "./redux/store";
import axios from "axios";
import { Provider } from "react-redux";
const token = localStorage.mashDBToken;
// console.log(token);
if (token) {
  console.log(token);
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_UNAUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());

    // window.location.href = "/";
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
