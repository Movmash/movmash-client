const {
  LOADING_ROOM,
  LOADING_MESSAGE,
  SET_ALL_MESSAGE,
  SET_ALL_ROOMS,
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
  }

  return state;
};

export default chatReducer;
