import {
  SET_PROFILE_POSTS,
  SET_INFO_LOADING,
  PROFILE_UNLIKE_POST,
  PROFILE_SUBMIT_COMMENT,
  PROFILE_LIKE_POST,
} from "../types";
import axios from "axios";

export const getUserPost = () => (dispatch) => {
  dispatch({ type: SET_INFO_LOADING });
  axios
    .get("http://localhost:8000/api/v1/home/myPost")
    .then((res) => {
      // console.log(res.data);
      dispatch({ type: SET_PROFILE_POSTS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const profileLikePost = (postId) => (dispatch) => {
  axios
    .put(`http://localhost:8000/api/v1/home/like-post`, { postId: postId })
    .then((res) => {
      console.log(res);
      dispatch({
        type: PROFILE_LIKE_POST,
        payload: res.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const profileUnlikePost = (postId) => (dispatch) => {
  axios
    .put("http://localhost:8000/api/v1/home/unlike-post", { postId: postId })
    .then((res) => {
      dispatch({ type: PROFILE_UNLIKE_POST, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const profileSubmitComment = (data) => (dispatch) => {
  axios
    .post("http://localhost:8000/api/v1/home/comment-post", data)
    .then((res) => {
      dispatch({ type: PROFILE_SUBMIT_COMMENT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
