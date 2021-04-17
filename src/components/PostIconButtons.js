import React, { useState } from "react";
import "./stylesheets/PostIconButtons.css";
// import MovieIcon from "@material-ui/icons/Movie";
import { likePost, unlikePost } from "../redux/actions/postAction";
import { connect } from "react-redux";
import ChatIcon from "@material-ui/icons/Chat";
import ShareIcon from "@material-ui/icons/Share";
import {
  sendBookingRequest,
  cancelRequestedTicket,
} from "../redux/actions/ticketAction";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { IconButton, Dialog } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NearMeIcon from "@material-ui/icons/NearMe";
import {
  profileLikePost,
  profileUnlikePost,
} from "../redux/actions/dataAction";
import FriendListMessage from "./FriendListMessage";
import ClearIcon from "@material-ui/icons/Clear";
function PostIconButtons({
  type,
  setSearchMovie,
  likePost,
  postId,
  unlikePost,
  likes,
  user,
  setLikeCountShown,
  tag,
  profileLikePost,
  profileUnlikePost,
  details,
  ticketDetails,
  sendBookingRequest,
  cancelRequestedTicket,
}) {
  const handleLikePost = (id) => {
    if (tag) {
      console.log(id);
      profileLikePost(id);
    } else {
      likePost(id);
    }
  };
  const handleUnLikePost = (id) => {
    if (tag) {
      profileUnlikePost(id);
    } else {
      unlikePost(id);
    }
  };
  const [isliked, setLikes] = useState(likes.includes(user._id));
  const [openSendPostDialog, setOpenSendPostDilog] = useState(false);
  const [bookingSent, setBookingSent] = useState(
    type === "ticket" && ticketDetails.bookingRequest.includes(user._id)
  );
  const handleOpenSendPost = () => {
    setOpenSendPostDilog(true);
  };
  const handleCloseSendPost = () => {
    setOpenSendPostDilog(false);
  };
  const handleBookNow = () => {
    // const bookingRequest = {
    //   postId: ticketDetails._id,
    //   postedBy: ticketDetails.postedBy._id,
    //   showTimeFrom: ticketDetails.showTimeFrom,
    //   showTimeTo: ticketDetails.showTimeTo,
    // };
    sendBookingRequest({
      postId: ticketDetails._id,
      postedBy: ticketDetails.postedBy._id,
      showTimeFrom: new Date(ticketDetails.showTimeFrom),
      showTimeTo: new Date(ticketDetails.showTimeTo),
    });
    setBookingSent(true);
  };
  const handleCancelNow = () => {
    cancelRequestedTicket({
      postId: ticketDetails._id,
      requestedBy: user._id,
    });
    setBookingSent(false);
  };
  return (
    <div className="postIconButtons">
      {(type === "review" || type === "suggestMe") && (
        <>
          {/* {likes.includes(user._id) ? (
            <div className="postIconButtons--likeButton">
              <IconButton
                onClick={() => {
                  handleUnLikePost(postId);
                }}
              >
                <FavoriteIcon></FavoriteIcon>
              </IconButton>
            </div>
          ) : (
            <div className="postIconButtons--likeButton">
              <IconButton
                onClick={() => {
                  handleLikePost(postId);
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </div>
          )} */}
          {isliked ? (
            <div className="postIconButtons--likeButton">
              <IconButton
                onClick={() => {
                  handleUnLikePost(postId);
                  setLikes((prev) => !prev);
                  setLikeCountShown((prev) => prev - 1);
                }}
              >
                <FavoriteIcon></FavoriteIcon>
              </IconButton>
            </div>
          ) : (
            <div className="postIconButtons--likeButton">
              <IconButton
                onClick={() => {
                  handleLikePost(postId);
                  setLikes((prev) => !prev);
                  setLikeCountShown((prev) => prev + 1);
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </div>
          )}
          {/* <div className="postIconButtons--likeButton"></div> */}
          {type === "suggestMe" ? (
            <div className="postIconButtons--comment">
              <IconButton
                onClick={() => {
                  setSearchMovie((prev) => !prev);
                }}
              >
                <SearchIcon />
              </IconButton>
            </div>
          ) : (
            <div className="postIconButtons--comment">
              <IconButton>
                <ChatIcon />
              </IconButton>
            </div>
          )}

          <div className="postIconButtons--share">
            <IconButton onClick={handleOpenSendPost}>
              <NearMeIcon />
            </IconButton>
            <Dialog onClose={handleCloseSendPost} open={openSendPostDialog}>
              <FriendListMessage
                closeDialog={handleCloseSendPost}
                postData={details}
                type={type}
              />
            </Dialog>
          </div>
        </>
      )}
      {type === "ticket" && (
        <div className="postIconButtons--ticketButtons">
          {!bookingSent ? (
            <div className="postIconButtons--BookNow" onClick={handleBookNow}>
              <IconButton>
                <ConfirmationNumberIcon />
              </IconButton>
              <h4>Book Now</h4>
            </div>
          ) : (
            <div
              className="postIconButtons--CancelBooking"
              onClick={handleCancelNow}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
              <h4>Cancel Now</h4>
            </div>
          )}

          {/* <div className="postIconButtons--schedule">
            <IconButton>
              <DateRangeIcon />
            </IconButton>
            <h4>Ask for another date</h4>
          </div> */}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, {
  likePost,
  unlikePost,
  profileUnlikePost,
  profileLikePost,
  sendBookingRequest,
  cancelRequestedTicket,
})(PostIconButtons);
