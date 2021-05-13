import { Avatar } from "@material-ui/core";
import React from "react";
import "./stylesheets/RequestedTicketDialog.css";

import Countdown from "react-countdown";
import { connect } from "react-redux";
function RequestedTicketDialog({ ticketList }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>You are good to go!</span>;
    } else {
      return (
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  return (
    <div className="requestedTicketDialog">
      <div className="requestedTicketDialog__heading">
        <h3>Your Shows</h3>
      </div>
      <div className="requestedTicketDialog__content">
        {ticketList.map((ticket) => (
          <div
            key={ticket._id}
            className="requestedTicketDialog__content__showcard"
          >
            <div className="requestedTicketDialog__content__showcard__heading">
              <Avatar></Avatar>
              <span>your show with ak47 will start in:</span>
            </div>
            <div className="requestedTicketDialog__content__showcard__content">
              <div className="requestedTicketDialog__content__showcard__content__movieposter">
                <img src="https://image.tmdb.org/t/p/w185//8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" alt="" />
              </div>
              <div className="requestedTicketDialog__content__showcard__content__countdown">
                <span>
                  <Countdown
                    renderer={renderer}
                    date={
                      Date.now() + (new Date(ticket.showTimeFrom) - Date.now())
                    }
                  ></Countdown>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ticketList: state.ticket.requestedTicketList,
  };
};

export default connect(mapStateToProps)(RequestedTicketDialog);
