import axios from "../../util/axios";
import {
  LOADING_UI,
  SET_ERRORS,
  SET_USER,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  GET_ALL_NOTIFICATION,
  ADD_NEW_NOTIFICATION,
  MARK_NOTIFICATIONS_READ,
  GET_UNREAD_ROOM,
} from "../types";

export const getUnreadUserRoom = () => (dispatch) => {
  axios
    .get("/api/v1/home/get-unread-rooms")
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_UNREAD_ROOM, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getAllNotification = () => (dispatch) => {
  axios
    .get("/api/v1/home/get-notification")
    .then((res) => {
      dispatch({ type: GET_ALL_NOTIFICATION, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const addNewNotification = (newNotification) => (dispatch) => {
  dispatch({ type: ADD_NEW_NOTIFICATION, payload: newNotification });
};
export const markNotificationRead = (notificationId) => (dispatch) => {
  axios
    .put(
      "/api/v1/home/user/read-notification",
      notificationId
    )
    .then((doc) => {
      console.log(doc);
      dispatch({ type: MARK_NOTIFICATIONS_READ, payload: notificationId });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/api/v1/home/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.idToken);
      dispatch(getUserData());
      history.push("/");
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/api/v1/home/get-user")
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
