import { GET_UPCOMINGMOVIE, LOADING_DATA, GET_MOVIEDETAIL } from "../types";

const initialState = {
  upcomingMovies: [],
  movieDetails: {},
  loading: true,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_UPCOMINGMOVIE:
      return {
        ...state,
        upcomingMovies: action.payload,
        loading: false,
      };
    case GET_MOVIEDETAIL:
      return {
        ...state,
        movieDetails: action.payload,
        loading: false,
      };

    default:
      break;
  }

  return state;
};
export default movieReducer;
