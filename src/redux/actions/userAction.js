import axios from "../../util/axios";
// import Axios from "axios";
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
  AUTH_LOADING,
  UPDATE_USER_INFO,
  UPDATE_USER_PROFILE_PIC,
  UPDATE_LOADING,
  UPDATE_USER_COVER_PIC,
  REMOVE_FOLLOWER,
  UNDO_REMOVE_FOLLOWER,
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
  // localStorage.removeItem("mashDBToken");
  // delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href="http://localhost:8000/logout"
  // axios
  //   .get("/logout")
  //   .then((res) => {
     
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};

export const getOAuthUserData = () => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .get("/current_user")
    .then((res) => {
      console.log(res)
      if(res.data==="") return dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
      dispatch({ type: SET_ERRORS, payload: e.message });
    });
}

export const updateUserInfo = (userInfo, history) => (dispatch) => {
  axios.put("/api/v1/home/update-user-details", userInfo).then(res => {
    dispatch({ type: UPDATE_USER_INFO , payload: res.data});
    console.log(res.data)
    history.replace(`/@${res.data.userName}`)
  }).catch(e => {
    console.log(e);
  });
};

export const updateProfilePicture = (file) => dispatch => {
  dispatch({type:UPDATE_LOADING});
  const formData = new FormData();
  formData.set("image",file);
  axios.post("/api/v1/upload-image/profile", formData, {
    headers: {
      "content-type": "multipart/form-data", 
    },
  }).then(res => {
    dispatch({type: UPDATE_USER_PROFILE_PIC, payload: res.data})
  }).catch(e => {
    console.log(e);
  });
}
export const updateCoverPicture = (file) => (dispatch) => {
  dispatch({ type: UPDATE_LOADING });
  const formData = new FormData();
  formData.set("image", file);
  axios
    .post("/api/v1/upload-image/cover", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch({ type: UPDATE_USER_COVER_PIC, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const removeFollower = (removeFollowerId) => dispatch => {
  axios.post("/api/v1/home/remove-follower", { removeFollowerId }).then(res => {
    dispatch({type: REMOVE_FOLLOWER, payload: res.data});
    console.log(res.data);
  }).catch(e => {
    console.log(e);
  });
}
export const undoRemoveFollower = removeFollowerId => dispatch => {
  axios.post("/api/v1/home/undo-remove-follower", { removeFollowerId }).then(res => {
dispatch({ type: UNDO_REMOVE_FOLLOWER, payload: res.data });
  }).catch(e => {
    console.log(e);
  });
};
const setAuthorizationHeader = (token) => {
  const mashDBToken = `Bearer ${token}`;
  localStorage.setItem("mashDBToken", mashDBToken);
  axios.defaults.headers.common["Authorization"] = mashDBToken;
};
