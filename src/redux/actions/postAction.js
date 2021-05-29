import axios from "../../util/axios";
import {
  LOADING_DATA,
  SET_ERRORS,
  POST_POST,
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  SUBMIT_COMMENT,
  RESET_POST,
} from "../types";

export const getSubcriberPost = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/v1/home/getSubPost")
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};
export const getExplorePost = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/v1/explore/get-explore-post")
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
    .post("/api/v1/home/post", newPost)
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

export const likePost = (postId) => (dispatch) => {
  axios
    .put(`/api/v1/home/like-post`, { postId: postId })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const unlikePost = (postId) => (dispatch) => {
  axios
    .put("/api/v1/home/unlike-post", { postId: postId })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const submitComment = (data) => (dispatch) => {
  axios
    .post("/api/v1/home/comment-post", data)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const resetPost = () => (dispatch) => {
  dispatch({type:RESET_POST});
}