import axios from "axios";
const {
  LOADING_PEOPLE,
  LOADING_SEARCH_PEOPLE,
  LOADING_SEARCH_LIST,
  LOADING_SEARCH_MOVIE,
  LOADING_SEARCH_TICKET,
  LOADING_LIST,
  LOADING_TICKET,
  GET_SEARCH_PEOPLE,
  GET_SEARCH_LIST,
  GET_SEARCH_MOVIE,
  GET_SEARCH_TICKET,
  GET_LIST,
  GET_PEOPLE,
  GET_TICKET,
} = require("../types");

export const getPeople = () => (dispatch) => {
  dispatch({ type: LOADING_PEOPLE });
};

export const getList = () => (dispatch) => {};
export const getTicket = () => (dispatch) => {};

export const getSearchedPeople = (userQuery) => (dispatch) => {
  if (userQuery === "") {
    dispatch({ type: GET_SEARCH_PEOPLE, payload: [] });
  } else {
    dispatch({ type: LOADING_SEARCH_PEOPLE });
    axios
      .get(`http://localhost:8000/api/v1/search-user?search=${userQuery}`)
      .then((res) => {
        dispatch({ type: GET_SEARCH_PEOPLE, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
export const getSearchedMovie = (movieQuery) => (dispatch) => {
  if (movieQuery === "") {
    dispatch({ type: GET_SEARCH_MOVIE, payload: [] });
  } else {
    dispatch({ type: LOADING_SEARCH_MOVIE });
    axios
      .get(
        `http://localhost:8000/api/v1/movie/search-movie?query=${movieQuery}`
      )
      .then((res) => {
        dispatch({ type: GET_SEARCH_MOVIE, payload: res.data.results });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
export const getSearchedList = (listQuery) => (dispatch) => {
  if (listQuery === "") {
    dispatch({ type: GET_SEARCH_LIST, payload: [] });
  } else {
    dispatch({ type: LOADING_SEARCH_LIST });
    axios
      .get(`http://localhost:8000/api/v1/search-list?search=${listQuery}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_SEARCH_LIST, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
export const getSearchedTicket = (ticketQuery) => (dispatch) => {
  if (ticketQuery === "") {
    dispatch({ type: GET_SEARCH_TICKET, payload: [] });
  } else {
    dispatch({ type: LOADING_SEARCH_TICKET });
    axios
      .get(`http://localhost:8000/api/v1/search-ticket?search=${ticketQuery}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_SEARCH_TICKET, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
