import axios from "../../util/axios";
import {
    GET_BROWSE_GENRE,
    GET_BROWSE_LISTS,
    GET_BROWSE_PEOPLE,
    GET_BROWSE_TICKETS,
    INVALID_GENRE,
  LOADING_BROWSE,
} from "../types";

export const getBrowsePeople = () => (dispatch) => {
  dispatch({ type: LOADING_BROWSE });
  axios
    .get("/api/v1/search-get-people")
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_BROWSE_PEOPLE, payload: res.data });
    })
    .catch((e) => console.log(e));;
};
export const getBrowseList = () => (dispatch) => {
  dispatch({ type: LOADING_BROWSE });  
  axios
    .get("/api/v1/search-get-list")
    .then((res) => {
      dispatch({ type: GET_BROWSE_LISTS, payload: res.data });
    })
    .catch((e) => console.log(e));;
};
export const getBrowseGenre = (genreName,pageNumber) => (dispatch) => {
  dispatch({ type: LOADING_BROWSE });
    axios.get(`/api/v1/movie/genre/${genreName}/${pageNumber}`).then((res) => {
      console.log(res.data)
      if (res.data.validGenre === false){
        return dispatch({ type: INVALID_GENRE});
      }else{

        
      dispatch({ type: GET_BROWSE_GENRE, payload: res.data.results });
      }
    }).catch(e=> console.log(e));
};
export const getBrowseTicket = () => (dispatch) => {
  dispatch({ type: LOADING_BROWSE });
    axios
      .get("/api/v1/search-get-ticket")
      .then((res) => {
        dispatch({ type: GET_BROWSE_TICKETS, payload: res.data });
      })
      .catch((e) => console.log(e));;
};