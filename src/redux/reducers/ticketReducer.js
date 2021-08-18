const {
  LOADING_REQUESTED_TICKET,
  GET_REQUESTED_TICKETS,
  SEND_BOOKING_REQUEST,
  DELETE_REQUESTED_TICKET,
  MARK_REQUESTED_TICKET_CONFIRM,
  GET_COMPLETED_REMINDERS,
  CHANGE_REMINDERS,
  REMOVE_REMINDER_TICKET,
} = require("../types");

const intialState = {
  requestedTicketList: [],
  requestedTicket: {},
  loading: false,
  totalCompletedReminder: 0,
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
        (ticket.requestedBy._id === action.payload.requestedBy ||
          ticket.postedBy._id === action.payload.postedBy) &&
        ticket.postId._id === action.payload.postId
      )
        ),
      ];

      return {
        ...state,
        loading: false,
        requestedTicketList: [...state.requestedTicketList],
      };
    case REMOVE_REMINDER_TICKET:
      state.requestedTicketList = [
        ...state.requestedTicketList.filter(
          (ticket) =>
          ticket._id !== action.payload.ticketId
        ),
      ];

      return {
        ...state,
        loading: false,
        requestedTicketList: [...state.requestedTicketList],
      };
    case MARK_REQUESTED_TICKET_CONFIRM:
      const requestedTicketIndex = state.requestedTicketList.findIndex(
        (ticket) => ticket._id === action.payload._id
      );
      state.requestedTicketList[requestedTicketIndex].bookingStatus =
        action.payload.bookingStatus;
      return {
        ...state,
        loading: false,
        requestedTicketList: [...state.requestedTicketList],
      };
    case GET_COMPLETED_REMINDERS:
      return {
        ...state,
        totalCompletedReminder: action.payload,
      };
    case CHANGE_REMINDERS:
      return {
        ...state,
        totalCompletedReminder: action.payload,
      };
    default:
      return state;
  }
  // return state;
};

export default ticketReducer;
