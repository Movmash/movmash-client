import React, { useState, useEffect } from "react";
import "./stylesheets/MovieInfoCard.css";
import { IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import StarIcon from "@material-ui/icons/Star";
import ListIcon from "@material-ui/icons/List";
import NearMeIcon from "@material-ui/icons/NearMe";
import { genreConverter } from "../util/genreConverter";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import RatingFrom from "./RatingFrom";

function MovieInfoCard({
  id,
  title,
  poster,
  releaseDate,
  genres,
  overview,
  tagline,
  duration,
  movieStatus,
}) {
  const movieGenresId = [];
  if (releaseDate !== undefined && genres !== undefined) {
    console.log(genres);
    for (let i = 0; i < genres.length; i++) {
      movieGenresId.push(genres[i].id);
    }
  }
  const [selectedLike, setSelectedLike] = useState(movieStatus.liked);
  const [selectedDislike, setSelectedDislike] = useState(movieStatus.disliked);
  const [selectedWatchList, setSelectedWatchList] = useState(
    movieStatus.inWatchlist
  );

  const [selectedRated, setRated] = useState(movieStatus.isRated);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  // useEffect(() => {
  //   const fetchMovieStatus = () => {
  //     axios
  //       .get(`http://localhost:8000/api/v1/movie/movie-status/${id}`)
  //       .then((res) => {
  //         setSelectedLike(res.data.liked);
  //         setSelectedDislike(res.data.disliked);
  //         setSelectedWatchList(res.data.inWatchlist);

  //         // console.log(res.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  //   fetchMovieStatus();
  //   return;
  // }, [id]);

  const movieDetails = {
    movieId: id,
    movieTitle: title,
    overview: overview,
    moviePoster: poster,
    releaseDate: releaseDate,
    genreId: movieGenresId,
  };
  const handleLikeMovie = () => {
    console.log("liked");
    setSelectedLike(true);
    setSelectedDislike(false);
    axios
      .post("http://localhost:8000/api/v1/movie/like-movie", movieDetails)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUnlikeMovie = () => {
    console.log("unlike");
    setSelectedLike(false);
    axios
      .post("http://localhost:8000/api/v1/movie/undo-like-movie", movieDetails)
      .then((res) => {
        // console.log(res.data);
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleDisLikeMovie = () => {
    console.log("disliked");
    setSelectedLike(false);
    setSelectedDislike(true);
    axios
      .post("http://localhost:8000/api/v1/movie/dislike-movie", movieDetails)
      .then((res) => {
        // console.log(res.data);
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUndoDislikeMovie = () => {
    console.log("undoDislike");
    setSelectedDislike(false);
    axios
      .post(
        "http://localhost:8000/api/v1/movie/undo-dislike-movie",
        movieDetails
      )
      .then((res) => {
        // console.log(res.data);
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddToWatchlist = () => {
    console.log("added to watchlist");
    setSelectedWatchList(true);
    axios
      .post("http://localhost:8000/api/v1/movie/add-to-watchlist", movieDetails)
      .then((res) => {
        // console.log(res.data);
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRemoveFromWatchlist = () => {
    console.log("remove from watchlist");
    setSelectedWatchList(false);
    axios
      .post(
        "http://localhost:8000/api/v1/movie/remove-from-watchlist",
        movieDetails
      )
      .then((res) => {
        //   console.log(res.data)
        return;
      })
      .catch((e) => console.log(e));
  };
  const handleOpenRatingDialog = () => {
    setOpenRatingDialog(true);
  };
  const handleCloseRatindDialog = () => {
    setOpenRatingDialog(false);
  };
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
            <h3>({releaseDate.split("-")[0]})</h3>
          </div>
        </div>
        <div className="movieInfoCard__info--subHeading">
          <div className="movieInfoCard__info--subHeading--info">
            {" "}
            <div className="movieInfoCard__info--subHeading--duration-genre">
              <h5>{duration} m</h5>
              <h5>{genreConverter(movieGenresId)}</h5>
            </div>
            <div className="movieInfoCard__info--subHeading--slogan">
              <h4>{tagline}</h4>
            </div>
          </div>
          <div className="movieInfoCard__info--subHeading--tagButtons">
            <div
              className={`movieInfoCard__info--subHeading--tagButton ${
                selectedLike ? "selected" : ""
              }`}
            >
              <IconButton
                onClick={() => {
                  if (!selectedLike) {
                    handleLikeMovie();
                  } else {
                    handleUnlikeMovie();
                  }
                }}
              >
                <ThumbUpAltIcon />
              </IconButton>
            </div>
            <div
              className={`movieInfoCard__info--subHeading--tagButton ${
                selectedDislike ? "selected" : ""
              }`}
            >
              <IconButton
                onClick={() => {
                  if (!selectedDislike) {
                    handleDisLikeMovie();
                  } else {
                    handleUndoDislikeMovie();
                  }
                }}
              >
                <ThumbDownIcon />
              </IconButton>
            </div>
            {!selectedRated ? (
              <div className="movieInfoCard__info--subHeading--tagButton">
                <IconButton onClick={handleOpenRatingDialog}>
                  <StarBorderIcon />
                </IconButton>
              </div>
            ) : (
              <div className="movieInfoCard__info--subHeading--tagButton selected">
                <IconButton onClick={handleOpenRatingDialog}>
                  <StarIcon />
                </IconButton>
              </div>
            )}
            <Dialog onClose={handleCloseRatindDialog} open={openRatingDialog}>
              <RatingFrom
                movieId={id}
                closeRatingForm={handleCloseRatindDialog}
              />
            </Dialog>

            {!selectedWatchList ? (
              <div className="movieInfoCard__info--subHeading--tagButton ">
                <IconButton onClick={handleAddToWatchlist}>
                  <BookmarkBorderIcon />
                </IconButton>
              </div>
            ) : (
              <div className="movieInfoCard__info--subHeading--tagButton selected">
                <IconButton onClick={handleRemoveFromWatchlist}>
                  <BookmarkIcon />
                </IconButton>
              </div>
            )}

            <div className="movieInfoCard__info--subHeading--tagButton">
              <IconButton>
                <ListIcon />
              </IconButton>
            </div>
            <div className="movieInfoCard__info--subHeading--tagButton">
              <IconButton>
                <NearMeIcon />
              </IconButton>
            </div>
          </div>
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
