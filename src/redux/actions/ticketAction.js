import axios from "../../util/axios";
import {
  LOADING_REQUESTED_TICKET,
  GET_REQUESTED_TICKETS,
  SEND_BOOKING_REQUEST,
  DELETE_REQUESTED_TICKET,
  MARK_REQUESTED_TICKET_CONFIRM,
  REMOVE_REMINDER_TICKET,
} from "../types";
import "./reminder";

export const getRequestedTicket = () => (dispatch) => {
  dispatch({ type: LOADING_REQUESTED_TICKET });
  axios
    .get("/api/v1/bookingTicket/get-requested-ticket")
    .then((res) => {
      dispatch({ type: GET_REQUESTED_TICKETS, payload: res.data });
      setMashReminder(res.data);
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
      dispatch({ type: SEND_BOOKING_REQUEST, payload: res.data });
      addNewReminder(res.data);
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
    ,{data:ticketInfo})
    .then((res) => {
      dispatch({ type: DELETE_REQUESTED_TICKET, payload: ticketInfo });
      removeReminder(ticketInfo);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const removeReminderTicket = (ticketInfo) => (dispatch) => {
  dispatch({ type: LOADING_REQUESTED_TICKET });
  axios
    .delete(
      `/api/v1/bookingTicket/cancel-requested-ticket/${ticketInfo.postId}`,
      { data: ticketInfo }
    )
    .then((res) => {
      dispatch({ type: REMOVE_REMINDER_TICKET, payload: ticketInfo });
      removeReminder(ticketInfo);
    })
    .catch((e) => {
      console.log(e);
    });
};
export const markRequestedTicketConfirmed = (ticketId) => (dispatch) => {
  dispatch({ type: LOADING_REQUESTED_TICKET });
  axios
    .put("/api/v1/bookingTicket/mark-ticket-confirm", {ticketId})
    .then((res) => {
      dispatch({ type: MARK_REQUESTED_TICKET_CONFIRM, payload: res.data });
      markReminderConfirm(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

const setMashReminder = (ticketList) => {
  const data = [];
  
  for(let i = 0; i < ticketList.length ; i++){
    data[i] = {
      id: ticketList[i]._id,
      expiryTime: ticketList[i].showTimeTo,
      status: ticketList[i].bookingStatus,
      postedBy: ticketList[i].postedBy._id,
      requestedBy: ticketList[i].requestedBy._id,
      postId: ticketList[i].postId._id,
    };
  }
  
  localStorage.setItem("mashReminder",JSON.stringify(data));
  // console.log(localStorage.mashReminder);
};

const addNewReminder = (newReminder) => {
  const filteredReminder = {
    id: newReminder._id,
    expiryTime: newReminder.showTimeFrom,
    status: newReminder.bookingStatus,
    postedBy: newReminder.postedBy._id,
    requestedBy: newReminder.requestedBy._id,
    postId: newReminder.postId._id,
  };
  
  const oldReminder = JSON.parse(localStorage.getItem("mashReminder"));
  const updatedReminder = [...oldReminder, filteredReminder];
  // console.log(updatedReminder);
  localStorage.setItem("mashReminder", JSON.stringify(updatedReminder));
};

const removeReminder = (reminderInfo) => {
  const { requestedBy, postedBy, postId } = reminderInfo;
  const reminder = JSON.parse(localStorage.getItem("mashReminder"));
  const index = reminder.findIndex(
    (ticket) =>
      !(
        (ticket.requestedBy._id === requestedBy ||
          ticket.postedBy._id === postedBy) &&
        ticket.postId._id === postId
      )
  );
  reminder.splice(index, 1);
  // console.log(reminder);
  localStorage.setItem("mashReminder", JSON.stringify(reminder));
}

const markReminderConfirm = (reminderInfo) => {
  const reminder = JSON.parse(localStorage.getItem("mashReminder"));
  const index = reminder.findIndex((ticket) => ticket.id === reminderInfo._id);
  reminder[index].status = reminderInfo.bookingStatus;
  localStorage.setItem("mashReminder", JSON.stringify(reminder));
}