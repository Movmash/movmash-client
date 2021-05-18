import React from "react";
import "./stylesheets/MovieCrewList.css";
import noCeleb from "../images/no_celeb.jpg"
function MovieCrewList({ casts }) {
  console.log(casts);
  return (
    <div className="movieCrewList">
      {casts.map((cast) =>(
          <div key={cast.cast_id} className="movieCrewList__container">
            <div className="movieCrewList__poster">
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : noCeleb
                }
                alt={cast.name}
              />
            </div>
            <div className="movieCrewList__info">
              <div className="movieCrewList__info--crewMember-name">
                <h4>{cast.name}</h4>
              </div>
              <div className="movieCrewList__info--crewMember-work">
                <h5>{cast.character}</h5>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MovieCrewList;
