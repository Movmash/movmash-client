const {
  LOADING_ROOM,
  LOADING_MESSAGE,
  SET_ALL_MESSAGE,
  SET_ALL_ROOMS,
  ADD_CHAT,
  UPDATE_ROOM,
  MARK_CHAT_ROOM_READ,
  CLEAR_CHAT,
} = require("../types");

const initialState = {
  rooms: [],
  messages: [],
  loadingRoom: false,
  loadingMessage: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ROOM:
      return {
        ...state,
        loadingRoom: true,
      };
    case LOADING_MESSAGE:
      return {
        ...state,
        loadingMessage: true,
      };
    case SET_ALL_MESSAGE:
      return {
        ...state,
        messages: [...action.payload],
        loadingMessage: false,
      };
    case SET_ALL_ROOMS:
      return {
        ...state,
        rooms: [...action.payload],
        loadingRoom: false,
      };
    case ADD_CHAT:
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case UPDATE_ROOM:
      // const newRoom = state.rooms.filter(
      //   (room) => room._id === action.payload._id
      // );
      const oldRoom = state.rooms.filter(
        (room) => room._id !== action.payload._id
      );
      return {
        ...state,
        rooms: [action.payload, ...oldRoom],
      };
    case MARK_CHAT_ROOM_READ:
      const roomIndex = state.rooms.findIndex(
        (room) => room._id === action.payload
      );
      console.log(state.rooms[roomIndex]);
      state.rooms[roomIndex].lastMessage = {
        ...state.rooms[roomIndex].lastMessage,
        read: true,
      };
      return {
        ...state,
        rooms: [...state.rooms],
      };
    case CLEAR_CHAT:
      return {
        ...state,
        messages: [],
      };
    default:
  }

  return state;
};

export default chatReducer;
