import axios from "axios";
import {
  LOADING_ROOM,
  SET_ALL_ROOMS,
  LOADING_MESSAGE,
  SET_ALL_MESSAGE,
  ADD_CHAT,
  UPDATE_ROOM,
  MARK_CHAT_ROOM_READ,
  CLEAR_CHAT,
} from "../types";

export const clearChat = () => (dispatch) => {
  dispatch({ type: CLEAR_CHAT });
};
export const updateRooms = (roomData) => (dispatch) => {
  dispatch({ type: UPDATE_ROOM, payload: roomData });
};
export const markChatRoomRead = (roomId) => (dispatch) => {
  axios
    .put("http://localhost:8000/api/v1/home/mark-chatRoom-read", {
      roomId: roomId,
    })
    .then((res) => {
      dispatch({ type: MARK_CHAT_ROOM_READ, payload: roomId });
    });
};
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

export const getRoomChats = (roomId) => (dispatch) => {
  dispatch({ type: LOADING_MESSAGE });
  axios
    .get(`http://localhost:8000/api/v1/home/get-rooms-messages/${roomId}`)
    .then((res) => {
      dispatch({ type: SET_ALL_MESSAGE, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addInChats = (chat) => (dispatch) => {
  dispatch({ type: ADD_CHAT, payload: chat });
};
