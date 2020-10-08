import React from "react";
import "./stylesheets/SearchMovieCard.css";
function SearchMovieCard({ select, poster, releaseDate, title }) {
  let releaseYear;
  if (releaseDate !== undefined) {
    releaseYear = releaseDate.split("-")[0];
  }
  return (
    <div onClick={select} className="searchMovieCard">
      {poster !== null ? (
        <div className="searchCard__dropDownImage">
          <img src={`https://image.tmdb.org/t/p/w92${poster}`} alt={title} />
        </div>
      ) : (
        <div className="searchCard__dropDownImage">
          <img
            src="https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
            alt={title}
          />
        </div>
      )}

      <div className="searchCard__dropDownInfo">
        <h4>
          {title} ({releaseYear})
        </h4>
      </div>
    </div>
  );
}

export default SearchMovieCard;
