import React from "react";
import "./stylesheets/MovieChatCard.css";
import { useHistory } from "react-router-dom";
function MovieChatCard({ movieData }) {
  console.log(movieData);
  const history = useHistory();
  return (
    <div
      onClick={() => {
        history.push(`/movie/${movieData.movieId}`);
      }}
      className="movieChatCard"
    >
      <img
        src={`https://image.tmdb.org/t/p/w154/${movieData.moviePoster}`}
        alt=""
      ></img>
    </div>
  );
}

export default MovieChatCard;
