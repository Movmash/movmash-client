import { GET_BROWSE_GENRE, GET_BROWSE_LISTS, GET_BROWSE_PEOPLE, GET_BROWSE_TICKETS, INVALID_GENRE, LOADING_BROWSE } from "../types";

const initialState = {
    peopleBrowse: [],
    ticketsBrowse: [],
    listsBrowse: [],
    genreBrowse: [],
    loading:false,
    validGenre: false,
}

const browseReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        
      case LOADING_BROWSE:
        return {
          ...state,
          loading: true,
        };
      case GET_BROWSE_PEOPLE:
        return {
          ...state,
          loading: false,
          peopleBrowse:[ ...action.payload],
        };
      case GET_BROWSE_LISTS:
        return {
          ...state,
          loading: false,
          listsBrowse: [ ...action.payload],
        };
      case GET_BROWSE_GENRE:
        return {
          ...state,
          loading: false,
          genreBrowse: [...action.payload],

          validGenre: true,
        };
      case GET_BROWSE_TICKETS:
        return {
          ...state,
          loading: false,
          ticketsBrowse: [ ...action.payload],
        };
      case INVALID_GENRE:
        return {
          ...state,
          genreBrowse: [],
          loading: false,
          validGenre: false,
        };
      default:
        return state;
    }
}

export default browseReducer;