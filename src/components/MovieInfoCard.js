import React from "react";
import "./stylesheets/MovieInfoCard.css";
function MovieInfoCard() {
  return (
    <div className="movieInfoCard">
      <div className="movieInfoCard__poster">
        <img
          className="movieInfoCard__poster-image__poster"
          src="https://i.pinimg.com/originals/5f/7d/94/5f7d941cd12e39b15ad99a175e1d4858.jpg"
          alt="fight Club"
        />
      </div>
      <div className="movieInfoCard__info">
        <div className="movieInfoCard__info--heading">
          <div className="movieInfoCard__info--heading-movieName">
            <h2>Fight Club</h2>
          </div>
          <div className="movieInfoCard__info--heading-releaseYear">
            <h3>(1999)</h3>
          </div>
        </div>
        <div className="movieInfoCard__info--subHeading">
          <div className="movieInfoCard__info--subHeading--info">
            {" "}
            <div className="movieInfoCard__info--subHeading--duration-genre">
              <h5>2h 19m</h5>
              <h5>Drama | Mystery</h5>
            </div>
            <div className="movieInfoCard__info--subHeading--slogan">
              <h4>Mischief. Mayhem. Soap.</h4>
            </div>
          </div>
          <div className="movieInfoCard__info--subHeading--tagButton"></div>
        </div>
        <div className="movieInfoCard__info--overview">
          <div className="movieInfoCard__info--overview-heading">
            <h4>Overview</h4>
          </div>
          <div className="movieInfoCard__info--overview-content">
            <h5>
              A ticking-time-bomb insomniac and a slippery soap salesman channel
              primal male aggression into a shocking new form of therapy. Their
              concept catches on, with underground "fight clubs" forming in
              every town, until an eccentric gets in the way and ignites an
              out-of-control spiral toward oblivion.
            </h5>
          </div>
        </div>
        <div className="movieInfoCard__info--crewMembers">
          <div className="movieInfoCard__info--crewMember">
            <div className="movieInfoCard__info--crewMember-name">
              <h4>David Fincher</h4>
            </div>
            <div className="movieInfoCard__info--crewMember-work">
              <h5>Director</h5>
            </div>
          </div>
          <div className="movieInfoCard__info--crewMember">
            <div className="movieInfoCard__info--crewMember-name">
              <h4>David Fincher</h4>
            </div>
            <div className="movieInfoCard__info--crewMember-work">
              <h5>Director</h5>
            </div>
          </div>
          <div className="movieInfoCard__info--crewMember">
            <div className="movieInfoCard__info--crewMember-name">
              <h4>David Fincher</h4>
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
