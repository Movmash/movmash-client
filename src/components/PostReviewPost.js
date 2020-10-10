import React, { useState, useEffect } from "react";
import "./stylesheets/PostReviewPost.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SearchMovieCard from "./SearchMovieCard";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { genreConverter } from "../util/genreConverter";
function PostReviewPost({ closeReview }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disableButton, setButtonDisabled] = useState(true);
  const [postMovie, setPostMovie] = useState({});
  const [rating, setRating] = useState(0);
  useEffect(() => {
    const fetchSearchResult = () => {
      if (query !== "") {
        axios
          .get(`http://localhost:8000/api/v1/movie/search-movie?query=${query}`)
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
      console.log("heelloo");
      setOpen((prev) => (prev = false));
    } else setOpen(true);
  };

  const handleOnClickSearchCard = (result) => {
    setOpen((prev) => (prev = false));
    console.log(result);
    setPostMovie(result);
    console.log(genreConverter(result.genre_ids));
  };

  return (
    <div className="postReviewPost">
      <div className="postReviewPost__container">
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
        <div className="postReviewPost__mainPost">
          {Object.keys(postMovie).length !== 0 && (
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
          )}

          <div
            className={
              Object.keys(postMovie).length === 0
                ? ""
                : "postReviewPost__contentInfo"
            }
          >
            {Object.keys(postMovie).length !== 0 && (
              <>
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
                    name="review post rating"
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
                    <h2>{rating}</h2>
                  </div>
                  <div className="postReviewPost__contentInfo--numericRating--outOff">
                    <h3>/ 5</h3>
                  </div>
                </div>{" "}
              </>
            )}
            <div className="postReviewPost__contentInfo--reviewContent">
              <TextField
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setButtonDisabled(false);
                  } else {
                    setButtonDisabled(true);
                  }
                }}
                id="outlined-multiline-static"
                label="Your Review"
                multiline
                rows={5}
                variant="outlined"
                inputProps={{ maxLength: 300 }}
              />
            </div>
          </div>
        </div>
        <div className="postReviewPost__bottomIcons">
          <div className="postReviewPost__bottomIcon">
            <Button onClick={closeReview} variant="outlined" color="secondary">
              Cancel
            </Button>
          </div>
          <div className="postReviewPost__bottomIcon">
            <Button
              disabled={disableButton}
              variant="contained"
              color="primary"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostReviewPost;
