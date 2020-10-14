import React, { useState } from "react";
import "./stylesheets/PostIconButtons.css";
// import MovieIcon from "@material-ui/icons/Movie";
import { likePost, unlikePost } from "../redux/actions/postAction";
import { connect } from "react-redux";
import ChatIcon from "@material-ui/icons/Chat";
import ShareIcon from "@material-ui/icons/Share";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
function PostIconButtons({
  type,
  setSearchMovie,
  likePost,
  postId,
  unlikePost,
  likes,
  user,
  setLikeCountShown,
}) {
  const handleLikePost = (id) => {
    likePost(id);
  };
  const handleUnLikePost = (id) => {
    unlikePost(id);
  };
  const [isliked, setLikes] = useState(likes.includes(user._id));
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
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { likePost, unlikePost })(
  PostIconButtons
);
