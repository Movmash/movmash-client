import React from "react";
import "./stylesheets/ReviewChatCard.css";
import { Avatar } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
function ReviewChatCard({ postData }) {
  // console.log(postData);
  return (
    <div className="reviewChatCard">
      {postData && (
        <div className="reviewChatCard__container">
          <div className="reviewChatCard__header">
            <Avatar src={postData.postedBy.profileImageUrl}></Avatar>
            <span>{postData.postedBy.userName}</span>
          </div>
          <div className="reviewChatCard__content">
            <img
              src={`https://image.tmdb.org/t/p/w154${postData.moviePoster}`}
              alt={postData.moviePoster}
            ></img>
          </div>
          <div className="reviewChatCard__bottom">
            <Rating
              name="read-only"
              value={postData.rating}
              precision={0.1}
              readOnly
              max={5}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewChatCard;
