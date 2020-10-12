import axios from "axios";
import { LOADING_DATA, SET_ERRORS, POST_POST, SET_POSTS } from "../types";

export const getSubcriberPost = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("http://localhost:8000/api/v1/home/getSubPost")
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const sendPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("http://localhost:8000/api/v1/home/post", newPost)
    .then((res) => {
      dispatch({ type: POST_POST, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: SET_ERRORS,
        payload: e,
      });
    });
};
