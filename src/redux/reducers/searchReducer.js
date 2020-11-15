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

const initialState = {
  people: [],
  list: [],
  ticket: [],
  searchedPeople: [],
  searchedMovie: [],
  searchedList: [],
  searchedTicket: [],
  loadingSearchedPeople: false,
  loadingSearchedMovie: false,
  loadingSearchedList: false,
  loadingSearchedTicket: false,
  loadingPeople: false,
  loadingList: false,
  loadingTicket: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SEARCH_PEOPLE:
      return {
        ...state,
        loadingSearchedPeople: true,
      };
    case LOADING_SEARCH_LIST:
      return {
        ...state,
        loadingSearchedList: true,
      };
    case LOADING_SEARCH_MOVIE:
      return {
        ...state,
        loadingSearchedMovie: true,
      };
    case LOADING_SEARCH_TICKET:
      return {
        ...state,
        loadingSearchedTicket: true,
      };
    case LOADING_PEOPLE:
      return {
        ...state,
        loadingSearchedTicket: true,
      };
    case LOADING_LIST:
      return {
        ...state,
        loadingSearchedTicket: true,
      };
    case LOADING_TICKET:
      return {
        ...state,
        loadingSearchedTicket: true,
      };
    case GET_PEOPLE:
      return {
        ...state,
        people: action.payload,
        loadingPeople: false,
      };
    case GET_TICKET:
      return {
        ...state,
        ticket: action.payload,
        loadingTicket: false,
      };
    case GET_LIST:
      return {
        ...state,
        list: action.payload,
        loadingList: false,
      };
    case GET_SEARCH_PEOPLE:
      return {
        ...state,
        searchedPeople: action.payload,
        loadingSearchedPeople: false,
      };
    case GET_SEARCH_LIST:
      return {
        ...state,
        searchedList: action.payload,
        loadingSearchedList: false,
      };
    case GET_SEARCH_MOVIE:
      return {
        ...state,
        searchedMovie: action.payload,
        loadingSearchedMovie: false,
      };
    case GET_SEARCH_TICKET:
      return {
        ...state,
        searchedTicket: action.payload,
        loadingSearchedTicket: false,
      };
    default:
  }
  return state;
};
export default searchReducer;
