import axios from "axios";
import {
  LOADING_UI,
  SET_ERRORS,
  SET_USER,
  LOADING_USER,
  SET_UNAUTHENTICATED,
} from "../types";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("http://localhost:8000/api/v1/home/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.idToken);
      dispatch(getUserData());
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("http://localhost:8000/api/v1/home/get-user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("mashDBToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = (token) => {
  const mashDBToken = `Bearer ${token}`;
  localStorage.setItem("mashDBToken", mashDBToken);
  axios.defaults.headers.common["Authorization"] = mashDBToken;
};
