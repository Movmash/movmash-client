import {
  SET_PROFILE_POSTS,
  SET_INFO_LOADING,
  PROFILE_UNLIKE_POST,
  PROFILE_SUBMIT_COMMENT,
  PROFILE_LIKE_POST,
  SET_PROFILE_LOADING,
  SET_MASH_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_NEW_PROFILE_LIST,
  SET_PROFILE_LISTS,
  DELETE_PROFILE_LIST,
  LOADING_PROFILE_LIST,
  UPDATE_PROFILE_LIST,
  LOADING_PROFILE_WATCHLIST,
  SET_PROFILE_WATCHLISTS,
  RESET_DATA_STATE,
  REMOVE_FROM_WATCHLIST,
  SET_PROFILE_ACTIVITY,
  LOADING_PROFILE_ACTIVITY,
  REMOVE_UNDO_LIKE_MOVIE,
  REMOVE_UNDO_DISLIKE_MOVIE,
} from "../types";
import axios from "../../util/axios";
export const getMashUserDetails = (userName) => (dispatch) => {
  dispatch({ type: SET_PROFILE_LOADING });
  axios
    .get(`/api/v1/home/mash-user-details/${userName}`)
    .then((res) => {
      dispatch({ type: SET_MASH_USER, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getUserPost = () => (dispatch) => {
  dispatch({ type: SET_INFO_LOADING });
  axios
    .get("/api/v1/home/myPost")
    .then((res) => {
      // console.log(res.data);
      dispatch({ type: SET_PROFILE_POSTS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getMashUserPost = (userName) => (dispatch) => {
  dispatch({ type: SET_INFO_LOADING });
  console.log(userName);
  axios
    .get(`/api/v1/home/mash-user-post/${userName}`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_PROFILE_POSTS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getUserLikeDislike = () => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_ACTIVITY });
  axios
    .get(`/api/v1/movie/get-user-like-dislike-movielist`)
    .then((res) => {
      dispatch({ type: SET_PROFILE_ACTIVITY, payload: res.data });
    });
};

export const getMashUserLikeDislike = (userName) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_ACTIVITY });
  axios
    .get(
      `/api/v1/movie/get-mash-user-like-dislike-movielist/${userName}`
    )
    .then((res) => {
      dispatch({ type: SET_PROFILE_ACTIVITY, payload: res.data });
    });
};
export const unlikeMovies = (movieId) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_ACTIVITY });
  axios
    .post("/api/v1/movie/undo-like-movie", { movieId })
    .then((res) => {
      dispatch({ type: REMOVE_UNDO_LIKE_MOVIE, payload: { movieId } });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const undoDislikeMovies = (movieId) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_ACTIVITY });
  axios
    .post("/api/v1/movie/undo-dislike-movie", { movieId })
    .then((res) => {
      dispatch({ type: REMOVE_UNDO_DISLIKE_MOVIE, payload: { movieId } });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const profileLikePost = (postId) => (dispatch) => {
  axios
    .put(`/api/v1/home/like-post`, { postId: postId })
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
    .put("/api/v1/home/unlike-post", { postId: postId })
    .then((res) => {
      dispatch({ type: PROFILE_UNLIKE_POST, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const profileSubmitComment = (data) => (dispatch) => {
  axios
    .post("/api/v1/home/comment-post", data)
    .then((res) => {
      dispatch({ type: PROFILE_SUBMIT_COMMENT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const followUser = (id) => (dispatch) => {
  axios
    .put(`/api/v1/home/user/follow`, { followId: id })
    .then((res) => {
      dispatch({ type: FOLLOW_USER, payload: res.data });
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const unfollowUser = (id) => (dispatch) => {
  console.log("unfollow");
  axios
    .put(`/api/v1/home/user/unfollow`, {
      unfollowId: id,
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: UNFOLLOW_USER, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createNewList = (data) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_LIST });
  axios
    .post("/api/v1/movie/create-new-list", data)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_NEW_PROFILE_LIST, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getUserList = () => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_LIST });
  axios
    .get("/api/v1/movie/get-user-list")
    .then((res) => {
      dispatch({ type: SET_PROFILE_LISTS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getMashUserList = (userName) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_LIST });
  axios
    .get(`/api/v1/movie/get-mash-user-list/${userName}`)
    .then((res) => {
      dispatch({ type: SET_PROFILE_LISTS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteList = (id) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_LIST });
  axios
    .delete(`/api/v1/movie/delete-list/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_PROFILE_LIST, payload: id });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const updateList = (data) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_LIST });
  axios
    .put(`/api/v1/movie/update-list`, data)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: UPDATE_PROFILE_LIST, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getUserWatchList = () => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_WATCHLIST });
  axios
    .get("/api/v1/movie/get-user-watchList")
    .then((res) => {
      dispatch({ type: SET_PROFILE_WATCHLISTS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getMashUserWatchList = (userName) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_WATCHLIST });
  axios
    .get(
      `/api/v1/movie/get-mash-user-watchlist/${userName}`
    )
    .then((res) => {
      dispatch({ type: SET_PROFILE_WATCHLISTS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const deleteFromWatchList = (movieId) => (dispatch) => {
  dispatch({ type: LOADING_PROFILE_WATCHLIST });
  axios
    .post("/api/v1/movie/remove-from-watchlist", {
      movieId,
    })
    .then((res) => {
      dispatch({ type: REMOVE_FROM_WATCHLIST, payload: { movieId } });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_DATA_STATE });
};
