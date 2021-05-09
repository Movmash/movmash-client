import axios from "../../util/axios";
import {
  LOADING_REQUESTED_TICKET,
  GET_REQUESTED_TICKETS,
  SEND_BOOKING_REQUEST,
  DELETE_REQUESTED_TICKET,
} from "../types";

export const getRequestedTicket = () => (dispatch) => {
  dispatch({ type: LOADING_REQUESTED_TICKET });
  axios
    .get("/api/v1/bookingTicket/get-requested-ticket")
    .then((res) => {
      dispatch({ type: GET_REQUESTED_TICKETS, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const sendBookingRequest = (requestData) => (dispatch) => {
  dispatch({ type: LOADING_REQUESTED_TICKET });
  // console.log(requestData);
  axios
    .post(
      "/api/v1/bookingTicket/send-booking-request",
      requestData
    )
    .then((res) => {
      console.log("heloo1");
      dispatch({ type: SEND_BOOKING_REQUEST, payload: res.data });
      console.log("heloo2");
    })
    .catch((e) => {
      console.log(e);
    });
};

export const cancelRequestedTicket = (ticketInfo) => (dispatch) => {
  dispatch({ type: LOADING_REQUESTED_TICKET });
  axios
    .delete(
      `/api/v1/bookingTicket/cancel-requested-ticket/${ticketInfo.postId}`
    )
    .then((res) => {
      dispatch({ type: DELETE_REQUESTED_TICKET, payload: ticketInfo });
    });
};
export const markRequestedTicketConfirmed = () => (dispatch) => {
  dispatch({ type: LOADING_REQUESTED_TICKET });
};
