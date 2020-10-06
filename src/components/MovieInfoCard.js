import React from "react";
import "./stylesheets/MovieInfoCard.css";
function MovieInfoCard({
  title,
  poster,
  releaseDate,
  genres,
  overview,
  tagline,
  duration,
}) {
  let releaseYear;
  let movieGenres;
  if (releaseDate !== undefined && genres !== undefined) {
    releaseYear = releaseDate.split("-")[0];
    console.log(releaseYear);

    for (let i = 0; i < genres.length; i++) {
      if (genres.length === 2) {
        if (i === 0) {
          movieGenres = `${genres[i].name} `;
        } else if (i === genres.length - 1) {
          movieGenres = movieGenres + `| ${genres[i].name}`;
        }
      } else {
        if (i === 0) {
          movieGenres = `${genres[i].name} |`;
        } else if (i === genres.length - 1) {
          movieGenres = movieGenres + ` ${genres[i].name}`;
        } else {
          movieGenres = movieGenres + ` ${genres[i].name} |`;
        }
      }
    }
  }
  // for (let i = 0; i <= crew.length; i++) {
  //   console.log(crew[i]);
  //   // if (crew[i].job === "Producer" || crew[i].job === "Director") {
  //   //   crews.push(crew[i]);
  //   // }
  // }
  // console.log(crew[0].job);
  return (
    <div className="movieInfoCard">
      <div className="movieInfoCard__poster">
        <img
          className="movieInfoCard__poster-image__poster"
          src={`https://image.tmdb.org/t/p/w300/${poster}`}
          alt={title}
        />
      </div>
      <div className="movieInfoCard__info">
        <div className="movieInfoCard__info--heading">
          <div className="movieInfoCard__info--heading-movieName">
            <h2>{title}</h2>
          </div>
          <div className="movieInfoCard__info--heading-releaseYear">
            <h3>({releaseYear})</h3>
          </div>
        </div>
        <div className="movieInfoCard__info--subHeading">
          <div className="movieInfoCard__info--subHeading--info">
            {" "}
            <div className="movieInfoCard__info--subHeading--duration-genre">
              <h5>{duration} m</h5>
              <h5>{movieGenres}</h5>
            </div>
            <div className="movieInfoCard__info--subHeading--slogan">
              <h4>{tagline}</h4>
            </div>
          </div>
          <div className="movieInfoCard__info--subHeading--tagButton"></div>
        </div>
        <div className="movieInfoCard__info--overview">
          <div className="movieInfoCard__info--overview-heading">
            <h4>Overview</h4>
          </div>
          <div className="movieInfoCard__info--overview-content">
            <h5>{overview}</h5>
          </div>
        </div>
        <div className="movieInfoCard__info--crewMembers">
          <div className="movieInfoCard__info--crewMember">
            <div className="movieInfoCard__info--crewMember-name">
              <h4>Elon</h4>
            </div>
            <div className="movieInfoCard__info--crewMember-work">
              <h5>Director</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoCard;
