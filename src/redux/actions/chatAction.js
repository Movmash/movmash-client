import axios from "axios";
import { LOADING_ROOM, SET_ALL_ROOMS } from "../types";

export const getAllRooms = () => (dispatch) => {
  dispatch({ type: LOADING_ROOM });
  axios
    .get("http://localhost:8000/api/v1/home/get-user-rooms")
    .then((res) => {
      dispatch({ type: SET_ALL_ROOMS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};
