import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./stylesheets/RequestedTicketDialog.css";
import DialogHeader from "./DialogHeader";
import { connect } from "react-redux";
import stringLimiter from "../util/stringLimiter";
import { genreConverter } from "../util/genreConverter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TabDescriptionInfo from "./TabDescriptionInfo";
import Countdown from "react-countdown";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";
import { useHistory } from "react-router-dom";
import {
  cancelRequestedTicket,
  markRequestedTicketConfirmed,
  removeReminderTicket,
} from "../redux/actions/ticketAction";
function RequestedTicketDialog({
  ticketList,
  closeRequestedDialog,
  userId,
  markRequestedTicketConfirmed,
  removeReminderTicket,
}) {
  const [countdown, isCountdownComplete] = useState([]);
  const [openDetail, isOpen] = useState(null);
  const history = useHistory();
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <span>
          {days.toString().padStart(2, "0")}:{hours.toString().padStart(2, "0")}
          :{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      );
    }
  };
  const checkCountDown = (value) => {
    isCountdownComplete((prev) => {
      return [...prev, value];
    });
  };
  const expandTicketDetails = (index) => {
    isOpen(index);
  };
  const handleCancelTicket = (postId, postedById, requestedById, ticketId) => {
    removeReminderTicket({
      postId: postId,
      requestedBy: requestedById,
      postedBy: postedById,
      ticketId: ticketId,
    });
  };
  return (
    <div className="requestedTicketDialog">
      <div className="requestedTicketDialog__heading">
        <DialogHeader
          heading="Your Shows"
          close={closeRequestedDialog}
          left={25.5}
        />
      </div>
      {ticketList.length !== 0 ? (
        <div className="requestedTicketDialog__content">
          {ticketList.map((ticket, index) => (
            <div
              key={ticket._id}
              className="requestedTicketDialog__content__showcard"
            >
              <div className="requestedTicketDialog__content__showcard__heading">
                <Avatar
                  alt={
                    userId === ticket.postedBy._id
                      ? ticket.requestedBy.fullName
                      : ticket.postedBy.fullName
                  }
                  src={
                    userId === ticket.postedBy._id
                      ? ticket.requestedBy.profileImageUrl
                      : ticket.postedBy.profileImageUrl
                  }
                ></Avatar>
                {userId === ticket.postedBy._id ? (
                  ticket.bookingStatus === "confirm" ? (
                    <h4>
                      Your show with <span>{ticket.requestedBy.fullName}</span>{" "}
                      will start in:
                    </h4>
                  ) : (
                    <h4>
                      <span>{ticket.requestedBy.fullName}</span> want to watch
                      your show with you. Your show will expire in:
                    </h4>
                  )
                ) : ticket.bookingStatus === "pending" ? (
                  <h4>
                    Your show request has been sent to{" "}
                    {ticket.postedBy.fullName}. Your show will expire in:
                  </h4>
                ) : (
                  <h4>
                    Your show with {ticket.postedBy.fullName} will start in:
                  </h4>
                )}
                {openDetail === ticket._id ? (
                  <div
                    className="dialogHeader__closeButton expandButton"
                    onClick={() => {
                      expandTicketDetails("");
                    }}
                    style={{ left: "52ch", background: "rgb(105 103 103)" }}
                  >
                    <ExpandLessIcon />
                  </div>
                ) : (
                  <div
                    className="dialogHeader__closeButton expandButton"
                    onClick={() => {
                      expandTicketDetails(ticket._id);
                    }}
                    style={{ left: "52ch", background: "rgb(105 103 103)" }}
                  >
                    <ExpandMoreIcon />
                  </div>
                )}
              </div>
              {openDetail === ticket._id && (
                <div className="postTicketPost__movieContent">
                  <div
                    className={`postTicketPost__movieContent-subContainer margin`}
                  >
                    <div className="postTicketPost__contentPoster RequestedTicketDialod__img">
                      <img
                        alt={"title"}
                        src={
                          ticket.postId.poster_path !== null
                            ? `https://image.tmdb.org/t/p/w92${ticket.postId.moviePoster}`
                            : "https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                        }
                      />
                    </div>
                    <div className="postTicketPost__contentInfo">
                      <div className="postTicketPost__contentInfo--heading">
                        <div className="postTicketPost__contentInfo--heading--movieName">
                          <h2>{ticket.postId.movieTitle}</h2>
                        </div>
                      </div>
                      <div className="postTicketPost__contentInfo--durationGenre">
                        <div className="postTicketPost__contentInfo--durationGenre--duration">
                          <h4>{ticket.postId.releaseYear}</h4>
                        </div>
                        <div className="postTicketPost__contentInfo--durationGenre--genre">
                          <h4>{genreConverter(ticket.postId.genreId)}</h4>
                        </div>
                      </div>

                      <div className="postTicketPost__contentInfo--overview">
                        <p>{stringLimiter(ticket.postId.overview, 100)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="requestedTicketDialog__content__showcard__content__countdown">
                <span>
                  <Countdown
                    renderer={renderer}
                    date={
                      Date.now() + (new Date(ticket.showTimeTo) - Date.now())
                    }
                    onMount={(data) => {
                      if (data.completed) return checkCountDown(ticket._id);
                    }}
                    onTick={(data) => {
                      if (data.completed) return checkCountDown(ticket._id);
                    }}
                  ></Countdown>
                </span>
              </div>
              {userId === ticket.postedBy._id ? (
                <div className="requestedTicketDialog__buttons">
                  <div
                    className={`requestedTicketDialog__button cancelRequestedTicket`}
                  >
                    <button
                      onClick={() =>
                        handleCancelTicket(
                          ticket.postId._id,
                          ticket.postedBy._id,
                          ticket.requestedBy._id,
                          ticket._id
                        )
                      }
                    >
                      Cancel show
                    </button>
                  </div>
                  {ticket.bookingStatus === "confirm" ? (
                    <div
                      className={`requestedTicketDialog__button createTheatre ${
                        !countdown.includes(ticket._id) && "disabled"
                      }`}
                    >
                      <button
                        onClick={() => {
                          history.push("/live");
                          closeRequestedDialog();
                        }}
                        disabled={!countdown.includes(ticket._id)}
                      >
                        Create theatre
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`requestedTicketDialog__button createTheatre`}
                    >
                      <button
                        onClick={() => {
                          markRequestedTicketConfirmed(ticket._id);
                        }}
                      >
                        Confirm show
                      </button>
                    </div>
                  )}
                </div>
              ) : ticket.bookingStatus === "pending" ? (
                <div
                  className={`requestedTicketDialog__button cancelRequestedTicket ${
                    ticket.bookingStatus === "pending" &&
                    "pendingRequestedTicket"
                  }`}
                >
                  <button
                    onClick={() =>
                      handleCancelTicket(
                        ticket.postId._id,
                        ticket.postedBy._id,
                        ticket.requestedBy._id,
                        ticket._id
                      )
                    }
                  >
                    Cancel request
                  </button>
                </div>
              ) : (
                <div className="requestedTicketDialog__buttons">
                  <div
                    className={`requestedTicketDialog__button cancelRequestedTicket`}
                  >
                    <button
                      onClick={() =>
                        handleCancelTicket(
                          ticket.postId._id,
                          ticket.postedBy._id,
                          ticket.requestedBy._id,
                          ticket._id
                        )
                      }
                    >
                      Cancel show
                    </button>
                  </div>

                  <div
                    className={`requestedTicketDialog__button createTheatre ${
                      !countdown.includes(ticket._id) && "disabled"
                    }`}
                  >
                    <button
                      onClick={() => {
                        history.push("/live");
                        closeRequestedDialog();
                      }}
                      disabled={!countdown.includes(ticket._id)}
                    >
                      Create theatre
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="requestedTicketList__notFound">
          <TabDescriptionInfo
            Icon={ConfirmationNumberTwoToneIcon}
            info="Show not found"
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ticketList: state.ticket.requestedTicketList,
    userId: state.user._id,
  };
};

export default connect(mapStateToProps, {
  cancelRequestedTicket,
  markRequestedTicketConfirmed,
  removeReminderTicket,
})(RequestedTicketDialog);

