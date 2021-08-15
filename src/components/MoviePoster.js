import React, { useState } from "react";
import "./stylesheets/MoviePoster.css";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovieDetail } from "../redux/actions/movieAction";
// import { genreConverter } from "../util/genreConverter";
import stringLimiter from "../util/stringLimiter";
import axios from "../util/axios";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { IconButton } from "@material-ui/core";
function MoviePoster({ posterUrl, id, getMovieDetail, detail }) {
  const history = useHistory();
  //   const [posterInfo, showPosterInfo] = useState(false);
  const [selectedLike, setSelectedLike] = useState(false);
  const [selectedDislike, setSelectedDislike] = useState(false);
  const [selectedWatchList, setSelectedWatchList] = useState(false);
  const [buttonAvailable, setButtonAvailabe] = useState(false);
  const clickHandler = (id) => {
    history.push(`/movie/${id}`);
    getMovieDetail(id);
  };

  const movieDetails = {
    movieId: detail.id,
    movieTitle: detail.title ? detail.title : detail.name,
    overview: detail.overview,
    moviePoster: detail.poster_path,
    releaseDate: detail.release_date,
    genreId: detail.genre_ids,
  };
  const handleLikeMovie = () => {
    // console.log("liked");
    setSelectedLike(true);
    setSelectedDislike(false);

    axios
      .post("/api/v1/movie/like-movie", movieDetails)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUnlikeMovie = () => {
    // console.log("unlike");
    setSelectedLike(false);
    axios
      .post("/api/v1/movie/undo-like-movie", movieDetails)
      .then((res) => {
        // console.log(res.data);
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleDisLikeMovie = () => {
    // console.log("disliked");
    setSelectedLike(false);
    setSelectedDislike(true);
    axios
      .post("/api/v1/movie/dislike-movie", movieDetails)
      .then((res) => {
        // console.log(res.data);
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUndoDislikeMovie = () => {
    // console.log("undodisliked");
    //
    setSelectedDislike(false);
    axios
      .post(
        "/api/v1/movie/undo-dislike-movie",
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
  const handleRemoveFromWatchlist = () => {
    // console.log("remove From WatchList");
    setSelectedWatchList(false);
    axios
      .post(
        "/api/v1/movie/remove-from-watchlist",
        movieDetails
      )
      .then((res) => {
        //   console.log(res.data)
        return;
      })
      .catch((e) => console.log(e));
  };
  const handleAddToWatchlist = () => {
    // console.log("Add to WatchList");
    setSelectedWatchList(true);
    axios
      .post("/api/v1/movie/add-to-watchlist", movieDetails)
      .then((res) => {
        // console.log(res.data);
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleOnHover = () => {
    axios
      .get(`/api/v1/movie/movie-status/${id}`)
      .then((res) => {
        setSelectedLike(res.data.liked);
        setSelectedDislike(res.data.disliked);
        setSelectedWatchList(res.data.inWatchlist);
        setButtonAvailabe(true);
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleHoverEnd = () => {
    // console.log("hell ye");

    setButtonAvailabe(false);
  };
  //   console.log(detail);
  return (
    <div
      onMouseEnter={handleOnHover}
      onMouseLeave={handleHoverEnd}
      className="moviePoster"
    >
      <div className="moviePoster__detailCard">
        <div className="details"></div>
        <div
          onClick={() => {
            clickHandler(id);
          }}
          className="moviePoster__detailCard__info"
        >
          <Link to={`/movie/${id}`}>
            <div className="moviePoster__detailCard__title">
              <span>
                {stringLimiter(detail.title ? detail.title : detail.name, 15)}{" "}
              </span>

              <span>
                (
                {detail.release_date !== undefined &&
                  detail.release_date.split("-")[0]}
                )
              </span>
            </div>{" "}
          </Link>
          <div className="moviePoster__detailCard__overview">
            <span>{stringLimiter(detail.overview, 50)}</span>
          </div>
        </div>
        {/* {buttonAvailable && ( */}
        <div
          className={`moviePoster__detailCard__buttons ${
            buttonAvailable ? "show" : ""
          }`}
        >
          <div
            className={`moviePoster__detailCard__button ${
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
              <ThumbUpIcon />
            </IconButton>
          </div>
          <div
            className={`moviePoster__detailCard__button ${
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
          {selectedWatchList ? (
            <div className={"moviePoster__detailCard__button selected"}>
              <IconButton onClick={handleRemoveFromWatchlist}>
                <BookmarkIcon />
              </IconButton>
            </div>
          ) : (
            <div className="moviePoster__detailCard__button">
              <IconButton onClick={handleAddToWatchlist}>
                <BookmarkBorderIcon />
              </IconButton>
            </div>
          )}
        </div>
        {/* )} */}
      </div>

      <img
        onClick={() => {
          clickHandler(id);
        }}
        className="moviePoster--image"
        src={`https://image.tmdb.org/t/p/w185/${posterUrl}`}
        alt="sasd"
      />
      {/* {posterInfo && ( */}
    </div>
  );
}
const mapDispatchTopProps = (dispatch) => {
  return {
    getMovieDetail: (movieId) => {
      dispatch(getMovieDetail(movieId));
    },
  };
};
export default connect(null, mapDispatchTopProps)(MoviePoster);
