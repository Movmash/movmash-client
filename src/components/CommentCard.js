import React from "react";
import "./stylesheets/CommentCard.css";
import { Avatar } from "@material-ui/core";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import urls from "../util/urls";
import { genreConverter } from "../util/genreConverter";
import { useHistory } from "react-router-dom";
function CommentCard({ commentDetail }) {
  const { commentedBy, comment } = commentDetail;
  const history = useHistory();
  return (
    <div className="commentCard">
      <div
        className={`commentCard__userComment ${
          "movieId" in commentDetail ? "" : "withoutMovie"
        }`}
      >
        <div className="commentCard__profilePic">
          <Avatar src={commentedBy.profileImageUrl} />
        </div>
        <div className="commentCard___comments">
          <div
            onClick={() => history.push(`/@${commentedBy.userName}`)}
            className="commentCard__userInfo"
          >
            <h5>{commentedBy.userName}</h5>
            {/* <IconButton>
              <FavoriteBorderIcon />
            </IconButton> */}
          </div>
          <div className="commentCard__CommentMessage">
            <p>{comment}</p>
          </div>
        </div>
      </div>
      {"movieId" in commentDetail && (
        <div className="commentCard__suggestedMovie">
          <div className="commentCard__suggestedMovie__poster">
            <img
              src={
                commentDetail.moviePoster
                  ? `${urls.movieBaseUrl}w92${commentDetail.moviePoster}`
                  : urls.movieNoPoster
              }
              alt={commentDetail.movieTitle}
            />
          </div>
          <div className="commentCard__suggestedMovie__details">
            <div className="commentCard__suggestedMovie__title">
              <h4>{commentDetail.movieTitle}</h4>
            </div>
            <div className="commentCard__suggestedMovie__yearGenre">
              <div className="commentCard__suggestedMovie__year">
                <h6>{commentDetail.releaseYear}</h6>
              </div>
              <div className="commentCard__suggestedMovie__genre">
                <h6>{genreConverter(commentDetail.genreId)}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
