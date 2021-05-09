import axios from "../../util/axios";
import {
  // LOADING_ALL_LIVESHOW,
  // GET_ALL_LIVESHOW,
  LOADING_LIVESHOW_DETAIL,
  GET_LIVESHOW_DETAIL,
  LOADING_CREATE_LIVESHOW,
  CREATE_LIVESHOW,
  LOADING_MY_FAMILY_SHOW,
  MY_FAMILY_SHOW,
} from "../types";

// export const getAllLiveShow = () => (dispatch) => {
//   dispatch({ type: LOADING_ALL_LIVESHOW });
//   axios
//     .get("http://localhost:8000/api/v1/live/get-all-live-show")
//     .then((res) => {
//       dispatch({ type: GET_ALL_LIVESHOW, payload: res.data });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

export const getLiveShowDetail = (roomCode, history) => (dispatch) => {
  dispatch({ type: LOADING_CREATE_LIVESHOW });

  axios
    .get(`/api/v1/live/get-live-show-details/${roomCode}`)
    .then((res) => {
      dispatch({ type: GET_LIVESHOW_DETAIL, payload: res.data });
      history.push(`/live/room/${roomCode}`);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getGenreLiveShow = (genre) => (dispatch) => {
  if (genre === "MyFamily") {
    dispatch({ type: LOADING_MY_FAMILY_SHOW });
    axios
      .get("/api/v1/live/get-followings-live-show")
      .then((res) => {
        dispatch({ type: MY_FAMILY_SHOW, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    dispatch({ type: `LOADING_${genre}` });
    axios
      .get(`/api/v1/live/get-genre-live-show/${genre}`)
      .then((res) => {
        dispatch({ type: genre, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

export const createLiveShow = (showDetail, history) => (dispatch) => {
  dispatch({ type: LOADING_CREATE_LIVESHOW });
  axios
    .post("/api/v1/live/create-live-show", showDetail)
    .then((res) => {
      dispatch({ type: CREATE_LIVESHOW, payload: res.data });
      history.push(`/live/room/${res.data.roomCode}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
