import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  GET_ALL_NOTIFICATION,
  ADD_NEW_NOTIFICATION,
  MARK_NOTIFICATIONS_READ,
  GET_UNREAD_ROOM,
  UPDATE_ROOM,
  LOADING_USER,
  AUTH_LOADING,
  SET_ERRORS
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  authLoading: false,
  credential: {},
  likes: [],
  notifications: [],
  messageRoom: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        authLoading:false,
        ...action.payload,
      };
    case GET_ALL_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
      };
    case ADD_NEW_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case MARK_NOTIFICATIONS_READ:
      const newNotification = state.notifications
        .filter((noti) => action.payload.includes(noti._id))
        .map((noti) => ({ ...noti, read: true }));
      const oldNotification = state.notifications.filter(
        (noti) => !action.payload.includes(noti._id)
      );
      return {
        ...state,
        notifications: [...newNotification, ...oldNotification],
      };
    case GET_UNREAD_ROOM:
      return {
        ...state,
        messageRoom: action.payload,
      };
    case UPDATE_ROOM:
      console.log(action.payload);
      const oldRoom =
        state.messageRoom !== undefined
          ? state.messageRoom.filter((room) => room._id !== action.payload._id)
          : [];
      return {
        ...state,
        messageRoom: [action.payload, ...oldRoom],
      };
    case LOADING_USER:
      return {
        ...state,
        loading:true
      }  
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true
      }  
    case SET_ERRORS:
      return {
        ...state,
        authLoading: false
      }  
    default:
      return state;
  }
}
