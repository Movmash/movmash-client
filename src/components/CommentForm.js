import React, { useState, useEffect } from "react";
import "./stylesheets/CommentForm.css";
import {
  Button,
  ClickAwayListener,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import SearchMovieCard from "./SearchMovieCard";
import { genreConverter } from "../util/genreConverter";
import stringLimiter from "../util/stringLimiter";
import urls from "../util/urls";
function CommentForm({ postId, type, openSearchMovie }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postMovie, setPostMovie] = useState({});
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
  const handleClickAway = () => {
    setOpen(false);
  };
  // console.log(postMovie);
  return (
    <div className="commentForm">
      {type === "suggestMe" && openSearchMovie && (
        <div className="commentForm__searchMovie">
          <div className="commentForm__header">
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <TextField
                  onChange={(event) => {
                    handleOnChange(event);
                    setQuery(event.target.value);
                  }}
                  id={postId}
                  name="commentForm"
                  label="Search Your Movie"
                />
                {open &&
                  (loading ? (
                    <div className="commentForm-clickAwayListener--content searchInput__Loading">
                      <CircularProgress />
                    </div>
                  ) : searchResult.length === 0 && query !== "" ? (
                    <div className="commentForm-clickAwayListener--content searchInput__NotFound">
                      <h3>0 results are found</h3>
                    </div>
                  ) : (
                    <div className="commentForm-clickAwayListener--content">
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
          {Object.keys(postMovie).length !== 0 && (
            <div className="commentForm__moviePreview">
              <div className="commentForm__moviePreview__poster">
                <img
                  src={`${urls.movieBaseUrl}w92${postMovie.poster_path}`}
                  alt=""
                />
              </div>
              <div className="commentForm__moviePreview__movieInfo">
                <div className="commentForm__moviePreview__movieInfo__title">
                  <h3>{postMovie.title ? postMovie.title : postMovie.name}</h3>
                </div>
                <div className="commentForm__moviePreview__movieInfo__genreYear">
                  <div className="commentForm__moviePreview__movieInfo__year">
                    <h4>{postMovie.release_date.split("-")[0]}</h4>
                  </div>
                  <div className="commentForm__moviePreview__movieInfo__genre">
                    <h4>{genreConverter(postMovie.genre_ids)}</h4>
                  </div>
                </div>
                <div className="commentForm__moviePreview__movieInfo__overview">
                  <p>{stringLimiter(postMovie.overview, 150)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="commentForm__input">
        <div className="commentForm__inputTextArea">
          {/* <script src="https://rawgit.com/jackmoore/autosize/master/dist/autosize.min.js"></script> */}
          <textarea
            cols={65}
            rows={1}
            placeholder="Add a comment ..."
            autoComplete="off"
            autoCorrect="off"
            // style="height: 16px;"
          ></textarea>
        </div>
        <Button>Post</Button>
      </div>
    </div>
  );
}

export default CommentForm;
