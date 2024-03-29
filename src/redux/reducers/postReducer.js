import {
  LOADING_DATA,
  SET_POSTS,
  SET_POST,
  POST_POST,
  LIKE_POST,
  UNLIKE_POST,
  SUBMIT_COMMENT,
  // SEND_BOOKING_REQUEST_POST,
  // DELETE_REQUESTED_TICKET_POST,
  DELETE_REQUESTED_TICKET,
  SEND_BOOKING_REQUEST,
  RESET_POST,
  ERROR_POST,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  validPost:true
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
        loading: false,
        validPost: true,
      };
    case ERROR_POST:
      return {
        ...state,
        loading:false,
        validPost:false,
      }  
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
      if (likeIndex === -1)
        return {
          ...state,
          post: {
            ...state.post,
            likeCount: action.payload.likeCount,
            likes: action.payload.likes,
          },
        };
      const newPosts = [...state.posts];
      newPosts[likeIndex].likeCount = action.payload.likeCount;
      newPosts[likeIndex].likes = [...action.payload.likes];
      // state.posts[likeIndex].likeCount = action.payload.likeCount;
      // console.log(state.posts[likeIndex].likeCount);
      // state.posts[likeIndex].likes = action.payload.likes;
      return {
        ...state,
        posts: [...newPosts],
        // posts: [
        //   ...state.posts,
        //   state.posts[likeIndex].likeCount,
        //   state.posts[likeIndex].likes,
        // ],
      };
    case SUBMIT_COMMENT:
      const commentIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (commentIndex === -1)
        return {
          ...state,
          post: {
            ...state.post,
            commentCount: action.payload.commentCount,
            comments: action.payload.comments,
          },
        };
      state.posts[commentIndex].commentCount = action.payload.commentCount;
      state.posts[commentIndex].comments = action.payload.comments;
      return {
        ...state,
        posts: [...state.posts],
      };
    case SEND_BOOKING_REQUEST:
      //..........                   <<-------
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.postId._id
      );
      if(postIndex === -1) return {
        ...state,
      };
      const newPostTicket = [...state.posts];
      newPostTicket[postIndex].bookingRequest = [
        action.payload.requestedBy._id,
        ...newPostTicket[postIndex].bookingRequest,
      ];
      // console.log(action.payload.requestedBy);
      return {
        ...state,
        posts: [...newPostTicket],
      };
    case DELETE_REQUESTED_TICKET:
      const postDeleteIndex = state.posts.findIndex(
        (post) => post._id === action.payload.postId
      );
      if (postDeleteIndex === -1)
        return {
          ...state,
        };
      const newDeletePostTicket = [...state.posts];
      // console.log(action.payload);
      newDeletePostTicket[postDeleteIndex].bookingRequest = newDeletePostTicket[
        postDeleteIndex
      ].bookingRequest.filter((id) => id !== action.payload.requestedBy);
      return {
        ...state,
        posts: [...newDeletePostTicket],
      };
    case RESET_POST:
      return {
        ...state,
        posts: []
      }  
    default:
      return state;
  }
}
