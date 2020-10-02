import React from "react";
import "./stylesheets/MovieReviewButtons.css";
function MovieReviewButtons() {
  return (
    <div className="movieReviewButtons">
      <div className="movieReviewButtons_container">
        <div className="movieReviewButtons--row">
          <div className="movieReviewButton oneo"></div>
          <div className="movieReviewButton onet"></div>
        </div>
        <div className="movieReviewButtons--row2">
          <div className="movieReviewButton twoo"></div>
          <div className="movieReviewButton twot"></div>
        </div>
        <div className="movieReviewButtons--row3">
          <div className="movieReviewButton threeo"></div>
          <div className="movieReviewButton threet"></div>
        </div>
      </div>
    </div>
  );
}

export default MovieReviewButtons;
