import React, { useState } from "react";
import "./stylesheets/ReviewPost.css";
import PostIconButtons from "./PostIconButtons";
import UserNamePlate from "./UserNamePlate";
import { genreConverter } from "../util/genreConverter";
import Rating from "@material-ui/lab/Rating";
import urls from "../util/urls";
import PostDetails from "./PostDetails";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
function ReviewPost({ details, postId, type }) {
  const {
    moviePoster,
    movieTitle,
    review,
    releaseYear,
    genreId,
    rating,
    postedBy,
    createdAt,
    likeCount,
    commentCount,
    likes,
    comments,
  } = details;
  const [likeCountShown, setLikeCountShown] = useState(likeCount);
  console.log(details.comments);
  return (
    <div className="reviewPost">
      <div className="reviewPost__container">
        <div className="reviewPost__header">
          <UserNamePlate
            imageUrl={postedBy.profileImageUrl}
            type="Review"
            name="Ankur Kunal"
            username={postedBy.userName}
          />
        </div>
        <div className="reviewPost__mainPost">
          <div className="reviewPost__contentPoster">
            <img
              alt={movieTitle}
              src={
                moviePoster !== null
                  ? `${urls.movieBaseUrl}w185${moviePoster}`
                  : urls.movieNoPoster
              }
            />
          </div>
          <div className="reviewPost__contentInfo">
            <div className="reviewPost__contentInfo--heading">
              <div className="reviewPost__contentInfo--heading--movieName">
                <h2>{movieTitle}</h2>
              </div>
              {/* <div className="reviewPost__contentInfo--heading--ReleaseYear">
                <h3>({releaseYear})</h3>
              </div> */}
            </div>
            <div className="reviewPost__contentInfo--durationGenre">
              <div className="reviewPost__contentInfo--durationGenre--duration">
                <h4>{releaseYear}</h4>
              </div>
              <div className="reviewPost__contentInfo--durationGenre--genre">
                <h4>{genreConverter(genreId)}</h4>
              </div>
            </div>
            <div className="reviewPost__contentInfo--starRating">
              <Rating
                name="read-only"
                value={rating}
                precision={0.1}
                readOnly
                max={5}
              />
            </div>
            <div className="reviewPost__contentInfo--numericRating">
              <div className="reviewPost__contentInfo--numericRating--rateValue">
                <h2>{rating}</h2>
              </div>
              <div className="reviewPost__contentInfo--numericRating--outOff">
                <h3>/ 5</h3>
              </div>
            </div>
            <div className="reviewPost__contentInfo--reviewContent">
              <p>{review}</p>
            </div>
          </div>
        </div>
        <div className="reviewPost__postDetails">
          <PostDetails
            createdAt={createdAt}
            likeCount={likeCountShown}
            commentCount={commentCount}
          />
        </div>
        <div className="reviewPost__bottomIcons">
          <PostIconButtons
            setLikeCountShown={setLikeCountShown}
            likes={likes}
            postId={postId}
            type="review"
          />
        </div>
        <div className="reviewPost__commentRepresentation">
          <CommentList comments={comments} />
        </div>
        <div className="commentForm">
          <CommentForm postId={postId} type={type} />
        </div>
      </div>
    </div>
  );
}

export default ReviewPost;
