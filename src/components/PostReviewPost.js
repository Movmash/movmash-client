import React, { useState, useEffect } from "react";
import "./stylesheets/PostReviewPost.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SearchMovieCard from "./SearchMovieCard";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TextField from "@material-ui/core/TextField";
import axios from "../util/axios";
import { CircularProgress } from "@material-ui/core";
import { genreConverter } from "../util/genreConverter";
import { sendPost } from "../redux/actions/postAction";
import { connect } from "react-redux";
import DialogHeader from "./DialogHeader";
function PostReviewPost({ closeReview, sendPost, postType }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disableButton, setButtonDisabled] = useState(true);
  const [postMovie, setPostMovie] = useState({});
  const [rating, setRating] = useState(null);
  useEffect(() => {
    const fetchSearchResult = () => {
      if (query !== "") {
        axios
          .get(`/api/v1/movie/search-movie?query=${query}`)
          .then((res) => {
            setLoading(false);
            setSearchResult([...res.data.results]);
          })
          .catch((e) => {
            setSearchResult([]);
            console.log(e);
          });
      }
    };
    setLoading(true);
    fetchSearchResult();
    return;
  }, [query]);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleOnChange = (event) => {
    if (event.target.value === "") {
      // console.log("heelloo");
      setOpen((prev) => (prev = false));
    } else setOpen(true);
  };

  const handleOnClickSearchCard = (result) => {
    setOpen((prev) => (prev = false));
    // console.log(result);
    setPostMovie(result);
    // console.log(genreConverter(result.genre_ids));
  };

  const handleSubmit = (event, movieDetail) => {
    event.preventDefault();
    const postDetails = {
      rating: rating,
      type: "review",
      movieId: movieDetail.id,
      review: event.target.reviewContent.value,
      genreId: movieDetail.genre_ids,
      moviePoster: movieDetail.poster_path,
      releaseYear: movieDetail.release_date.split("-")[0],
      movieTitle: movieDetail.title ? movieDetail.title : movieDetail.name,
      postType: postType,
    };
    // console.log(postDetails);
    sendPost(postDetails);
    closeReview();
  };

  return (
    <div className="postReviewPost">
      <div className="postReviewPost__container">
        <div className="postReviewPost__DialogHeader">
          <DialogHeader heading="Make your review" close={closeReview} />
        </div>
        <div className="postReviewPost__header">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <TextField
                onChange={(event) => {
                  handleOnChange(event);
                  setQuery(event.target.value);
                }}
                id="standard-basic"
                label="Search Your Movie"
                variant="filled"
                autoComplete="off"
              />
              {open &&
                (loading ? (
                  <div className="postReview-clickAwayListener--content searchInput__Loading">
                    <CircularProgress />
                  </div>
                ) : searchResult.length === 0 && query !== "" ? (
                  <div className="postReview-clickAwayListener--content searchInput__NotFound">
                    <h3>0 results are found</h3>
                  </div>
                ) : (
                  <div className="postReview-clickAwayListener--content">
                    {searchResult.map((result) => (
                      <SearchMovieCard
                        select={() => handleOnClickSearchCard(result)}
                        key={result.id}
                        id={result.id}
                        poster={result.poster_path}
                        releaseDate={result.release_date}
                        title={result.title ? result.title : result.name}
                      />
                    ))}
                  </div>
                ))}
            </div>
          </ClickAwayListener>
        </div>
        <form onSubmit={(event) => handleSubmit(event, postMovie)}>
          <div className="postReviewPost__mainPost">
            {/* {Object.keys(postMovie).length !== 0 && (
              <div className="postReviewPost__contentPoster">
                <img
                  alt={postMovie.title}
                  src={
                    postMovie.poster_path !== null
                      ? `https://image.tmdb.org/t/p/w92${postMovie.poster_path}`
                      : "https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                  }
                />
              </div>
            )} */}

            <div
              className={
                Object.keys(postMovie).length === 0
                  ? ""
                  : "postReviewPost__contentInfo"
              }
            >
              {Object.keys(postMovie).length !== 0 && (
                <div className="postReviewPost__contentMovie">
                  <div className="postReviewPost__contentPoster">
                    <img
                      alt={postMovie.title}
                      src={
                        postMovie.poster_path !== null
                          ? `https://image.tmdb.org/t/p/w92${postMovie.poster_path}`
                          : "https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                      }
                    />
                  </div>

                  <div>
                    <div className="postReviewPost__contentInfo--heading">
                      <div className="postReviewPost__contentInfo--heading--movieName">
                        <h2>
                          {postMovie.title ? postMovie.title : postMovie.name}
                        </h2>
                      </div>
                      {/* <div className="postReviewPost__contentInfo--heading--ReleaseYear">
                    <h3>(2009)</h3>
                  </div> */}
                    </div>
                    <div className="postReviewPost__contentInfo--durationGenre">
                      <div className="postReviewPost__contentInfo--durationGenre--duration">
                        <h4>{postMovie.release_date.split("-")[0]}</h4>
                      </div>
                      <div className="postReviewPost__contentInfo--durationGenre--genre">
                        <h4>{genreConverter(postMovie.genre_ids)}</h4>
                      </div>
                    </div>
                    <div className="postReviewPost__contentInfo--starRating">
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
                    <div className="postReviewPost__contentInfo--numericRating">
                      <div className="postReviewPost__contentInfo--numericRating--rateValue">
                        <h2>{rating === null ? "0" : rating}</h2>
                      </div>
                      <div className="postReviewPost__contentInfo--numericRating--outOff">
                        <h3>/ 5</h3>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              )}

              <div className="postReviewPost__contentInfo--reviewContent">
                <TextField
                  name="reviewContent"
                  onChange={(e) => {
                    if (
                      e.target.value !== "" &&
                      Object.keys(postMovie).length !== 0
                    ) {
                      setButtonDisabled(false);
                    } else {
                      setButtonDisabled(true);
                    }
                  }}
                  id="outlined-multiline-static"
                  label="Your Review"
                  multiline
                  rows={5}
                  variant="filled"
                  inputProps={{ maxLength: 300 }}
                />
              </div>
            </div>
          </div>
          <div className="postReviewPost__bottomIcons">
            <div className={`postReviewPost__bottomIcon ${disableButton && "disabled"}`}>
              <button disabled={disableButton} type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(null, { sendPost })(PostReviewPost);
