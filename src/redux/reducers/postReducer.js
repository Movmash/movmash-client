import { LOADING_DATA, SET_POSTS, SET_POST, POST_POST } from "../types";

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
    default:
      return state;
  }
}
