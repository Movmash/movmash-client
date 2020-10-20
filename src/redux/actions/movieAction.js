import axios from "axios";
import { GET_UPCOMINGMOVIE, LOADING_DATA, GET_MOVIEDETAIL } from "../types";
// export const getMovies = () => {
//   return (dispatch) => {
//     axios
//       .get("http://localhost:8000/api/v1/movie/upcoming-cover")
//       .then((res) => {
//         dispatch({ type: "SET_UPCOMING", payload: res.data });
//       })
//       .catch((e) => {
//         dispatch({ type: "err", payload: [] });
//       });
//   };
// };

export const getBannerUpcomingMovies = () => {
  return (dispatch) => {
    //  dispatch({ type: GET_UPCOMINGMOVIE, payload: [] });
    // console.log(dispatch);
    dispatch({ type: LOADING_DATA });
    axios
      .get("http://localhost:8000/api/v1/movie/upcoming-cover")
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_UPCOMINGMOVIE, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "err", payload: [] });
      });
  };
};

export const getMovieDetail = (movieId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`http://localhost:8000/api/v1/movie/details/${movieId}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: GET_MOVIEDETAIL, payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: "err", payload: [] });
      });
  };
};
