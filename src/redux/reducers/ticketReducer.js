const {
  LOADING_REQUESTED_TICKET,
  GET_REQUESTED_TICKETS,
  SEND_BOOKING_REQUEST,
  DELETE_REQUESTED_TICKET,
  MARK_REQUESTED_TICKET_CONFIRM,
} = require("../types");

const intialState = {
  requestedTicketList: [],
  requestedTicket: {},
  loading: false,
};

const ticketReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOADING_REQUESTED_TICKET:
      return {
        ...state,
        loading: true,
      };
    case GET_REQUESTED_TICKETS:
      return {
        ...state,
        loading: false,
        requestedTicketList: [...action.payload],
      };
    case SEND_BOOKING_REQUEST:
      return {
        ...state,
        loading: false,
        requestedTicketList: [action.payload, ...state.requestedTicketList],
      };
    case DELETE_REQUESTED_TICKET:
      state.requestedTicketList = [
        ...state.requestedTicketList.filter(
          (ticket) =>
            !(
              ticket.requestedBy._id === action.payload.requestedBy &&
              ticket.postId._id === action.payload.postId
            )
        ),
      ];

      return {
        ...state,
        loading: false,
        requestedTicketList: [...state.requestedTicketList],
      };
    case MARK_REQUESTED_TICKET_CONFIRM:
      return state;
    default:
      return state;  
  }
  // return state;
};

export default ticketReducer;
