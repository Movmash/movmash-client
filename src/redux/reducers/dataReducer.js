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
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_NEW_PROFILE_LIST,
  DELETE_PROFILE_LIST,
  LOADING_PROFILE_LIST,
  LOADING_PROFILE_WATCHLIST,
  LOADING_PROFILE_ACTIVITY,
  UPDATE_PROFILE_LIST,
  RESET_DATA_STATE,
  REMOVE_FROM_WATCHLIST,
  REMOVE_UNDO_DISLIKE_MOVIE,
  REMOVE_UNDO_LIKE_MOVIE,
} from "../types";

const initialState = {
  profilePosts: [],
  profileActivity: {
    likedMovies: [],
    dislikedMovies: [],
  },
  profileWatchLists: [],
  profileLists: [],
  mashUser: {},
  profileLoading: false,
  infoLoading: false,
  infoListLoading: false,
  infoActivityLoading: false,
  infoWatchListLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true,
      };
    case LOADING_PROFILE_LIST:
      return {
        ...state,
        infoListLoading: true,
      };
    case LOADING_PROFILE_WATCHLIST:
      return {
        ...state,
        infoWatchListLoading: true,
      };
    case LOADING_PROFILE_ACTIVITY:
      return {
        ...state,
        infoActivityLoading: true,
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
        profileActivity: {
          likedMovies: [...action.payload.likedMovies],
          dislikedMovies: [...action.payload.dislikedMovies],
        },
        infoActivityLoading: false,
      };
    case SET_PROFILE_WATCHLISTS:
      return {
        ...state,
        profileWatchLists: [...action.payload],
        infoWatchListLoading: false,
      };

    case SET_PROFILE_LISTS:
      return {
        ...state,
        profileLists: [...action.payload],
        infoListLoading: false,
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
    case FOLLOW_USER:
      return {
        ...state,
        mashUser: {
          ...state.mashUser,
          followersCount: action.payload.followersCount,
          followers: action.payload.followers,
        },
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        mashUser: {
          ...state.mashUser,
          followersCount: action.payload.followersCount,
          followers: action.payload.followers,
        },
      };
    case SET_NEW_PROFILE_LIST:
      return {
        ...state,
        profileLists: [action.payload, ...state.profileLists],
        infoListLoading: false,
      };
    case DELETE_PROFILE_LIST:
      return {
        ...state,
        profileLists: state.profileLists.filter(
          (list) => list._id !== action.payload
        ),
        infoListLoading: false,
      };
    case UPDATE_PROFILE_LIST:
      const listIndex = state.profileLists.findIndex(
        (list) => list._id === action.payload._id
      );
      state.profileLists[listIndex] = action.payload;
      return {
        ...state,
        profileLists: [...state.profileLists],
        infoListLoading: false,
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        infoWatchListLoading: false,
        profileWatchLists: state.profileWatchLists.filter(
          (list) => list.movieId !== action.payload.movieId
        ),
      };
    case REMOVE_UNDO_DISLIKE_MOVIE:
      return {
        ...state,
        infoActivityLoading: false,
        profileActivity: {
          likedMovies: [...state.profileActivity.likedMovies],
          dislikedMovies: state.profileActivity.dislikedMovies.filter(
            (dislikeMovie) => dislikeMovie.movieId !== action.payload.movieId
          ),
        },
      };
    case REMOVE_UNDO_LIKE_MOVIE:
      return {
        ...state,
        infoActivityLoading: false,
        profileActivity: {
          likedMovies: state.profileActivity.likedMovies.filter(
            (likeMovie) => likeMovie.movieId !== action.payload.movieId
          ),

          dislikedMovies: [...state.profileActivity.dislikedMovies],
        },
      };
    case RESET_DATA_STATE:
      return {
        ...state,
        profilePosts: [],
        profileActivity: {
          likedMovies: [],
          dislikedMovies: [],
        },
        profileWatchLists: [],
        profileLists: [],
      };
    default:
      break;
  }

  return state;
}
