import {
  LOADING_DATA,
  SET_POSTS,
  SET_POST,
  POST_POST,
  LIKE_POST,
  UNLIKE_POST,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case UNLIKE_POST:
    case LIKE_POST:
      const likeIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[likeIndex].likeCount = action.payload.likeCount;
      state.posts[likeIndex].likes = action.payload.likes;
      return {
        ...state,
        posts: [...state.posts],
      };
    case SUBMIT_COMMENT:
      const commentIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[commentIndex].commentCount = action.payload.commentCount;
      state.posts[commentIndex].comments = action.payload.comments;
      return {
        ...state,
        posts: [...state.posts],
      };
    default:
      return state;
  }
}
