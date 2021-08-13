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
  SET_ERRORS,
  UPDATE_USER_INFO,
  UPDATE_USER_PROFILE_PIC,
  UPDATE_LOADING,
  UPDATE_USER_COVER_PIC,
  FOLLOW_USER,
  UNFOLLOW_USER,
  REMOVE_FOLLOWER,
  UNDO_REMOVE_FOLLOWER,
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
    case FOLLOW_USER:
      ++state.followingsCount;
      return {
        ...state,
        followingsCount: state.followingsCount,
        followings: [...state.followings,action.payload._id],
      };
    case UNFOLLOW_USER:
      --state.followingsCount;
      const newFollowings = state.followings.filter(user => user !== action.payload._id)
      return {
        ...state,
        followingsCount: state.followingsCount,
        followings: [...newFollowings],
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_FOLLOWER:
      return {
        ...state,
        followersCount: action.payload.followersCount,
        followers: action.payload.followers
      }
    case UNDO_REMOVE_FOLLOWER: 
      return {
        ...state,
        followersCount: action.payload.followersCount,
        followers: action.payload.followers,
      };
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
        authLoading: false,
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
        loading: true,
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        authLoading: false,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER_PROFILE_PIC:
      return {
        ...state,
        loading: false,
        profileImageUrl: action.payload.imageUrl,
      };
    case UPDATE_USER_COVER_PIC:
      return {
        ...state,
        loading: false,
        coverImageUrl: action.payload.imageUrl,
      };
    default:
      return state;
  }
}
