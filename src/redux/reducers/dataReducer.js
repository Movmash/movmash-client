import {
  SET_MASH_USER,
  SET_PROFILE_POSTS,
  SET_PROFILE_ACTIVITY,
  SET_PROFILE_WATCHLISTS,
  SET_PROFILE_LISTS,
  SET_INFO_LOADING,
  SET_PROFILE_LOADING,
  PROFILE_LIKE_POST,
  PROFILE_UNLIKE_POST,
  PROFILE_SUBMIT_COMMENT,
} from "../types";

const initialState = {
  profilePosts: [],
  profileActivity: {},
  profileWatchLists: [],
  profileLists: [],
  mashUser: {},
  profileLoading: false,
  infoLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true,
      };
    case SET_INFO_LOADING:
      return {
        ...state,
        infoLoading: true,
      };
    case SET_MASH_USER:
      return {
        ...state,
        mashUser: { ...action.payload },
        profileLoading: false,
      };
    case SET_PROFILE_POSTS:
      return {
        ...state,
        profilePosts: [...action.payload],
        infoLoading: false,
      };

    case SET_PROFILE_ACTIVITY:
      return {
        ...state,
        profileActivity: { ...action.payload },
        infoLoading: false,
      };
    case SET_PROFILE_WATCHLISTS:
      return {
        ...state,
        profileWatchLists: [...action.payload],
        infoLoading: false,
      };

    case SET_PROFILE_LISTS:
      return {
        ...state,
        profileLists: [...action.payload],
      };
    case PROFILE_LIKE_POST:
    case PROFILE_UNLIKE_POST:
      const likeIndex = state.profilePosts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.profilePosts[likeIndex].likeCount = action.payload.likeCount;
      state.profilePosts[likeIndex].likes = action.payload.likes;
      return {
        ...state,
        profilePosts: [...state.profilePosts],
      };
    case PROFILE_SUBMIT_COMMENT:
      const commentIndex = state.profilePosts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.profilePosts[commentIndex].commentCount =
        action.payload.commentCount;
      state.profilePosts[commentIndex].comments = action.payload.comments;
      return {
        ...state,
        profilePosts: [...state.profilePosts],
      };
    default:
      break;
  }

  return state;
}
