import React from "react";
import "./stylesheets/PostIconButtons.css";
import MovieIcon from "@material-ui/icons/Movie";
import ChatIcon from "@material-ui/icons/Chat";
import ShareIcon from "@material-ui/icons/Share";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { IconButton } from "@material-ui/core";
function PostIconButtons({ type }) {
  return (
    <div className="postIconButtons">
      {(type === "review" || type === "suggestMe") && (
        <>
          <div className="postIconButtons--likeButton">
            <IconButton>
              <MovieIcon />
            </IconButton>
          </div>
          <div className="postIconButtons--comment">
            <IconButton>
              <ChatIcon />
            </IconButton>
          </div>
          <div className="postIconButtons--share">
            <IconButton>
              <ShareIcon />
            </IconButton>
          </div>
        </>
      )}
      {type === "ticket" && (
        <>
          <div className="postIconButtons--BookNow">
            <IconButton>
              <ConfirmationNumberIcon />
            </IconButton>
            <h4>Book Now</h4>
          </div>
          <div className="postIconButtons--schedule">
            <IconButton>
              <DateRangeIcon />
            </IconButton>
            <h4>Ask for another date</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default PostIconButtons;
