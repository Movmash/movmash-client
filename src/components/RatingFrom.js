import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import "./stylesheets/RatingFrom.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { TextField, Button } from "@material-ui/core";
import axios from "../util/axios";
// import {connect} from "react-redux"
function RatingFrom({ closeRatingForm, movieId }) {
  const [rating, setRating] = useState(null);
  const [description, setDescription] = useState("");
  const handleSubmit = () => {
    const reviewData = {
      movieId: movieId,
      rate: rating,
      description: description === "" ? undefined : description,
    };
    axios
      .post("/api/v1/movie/post-user-review", reviewData)
      .then((res) => {
        // console.log(res.data)
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="ratingForm">
      <div className="ratingForm__starRatingForm">
        {rating !== null && (
          <div className="ratingForm__preview">
            <span>{rating}</span>
          </div>
        )}

        <div className="ratingForm__stars">
          <Rating
            // onChangeActive={(e, value) => {
            //   setRating(value);
            // }}

            name="ratings"
            onChange={(e, value) => {
              setRating(value);
            }}
            defaultValue={0}
            precision={0.1}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
        </div>
      </div>
      <div className="ratingFrom__textRatingForm">
        <div className="postReviewPost__contentInfo--reviewContent">
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            name="reviewContent"
            id="outlined-multiline-static"
            label="Your Review"
            multiline
            rows={5}
            variant="outlined"
            inputProps={{ maxLength: 300 }}
          />
        </div>
      </div>
      <div className="ratingForm__RatingFormButton">
        <div className="postReviewPost__bottomIcon">
          <Button
            onClick={closeRatingForm}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </div>
        <div className="postReviewPost__bottomIcon">
          <Button
            onClick={handleSubmit}
            disabled={rating !== null ? false : true}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RatingFrom;
