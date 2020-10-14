import React, { useState, useEffect } from "react";
import "./stylesheets/CommentForm.css";
import {
  Button,
  ClickAwayListener,
  TextField,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import SearchMovieCard from "./SearchMovieCard";
import { genreConverter } from "../util/genreConverter";
import stringLimiter from "../util/stringLimiter";
import urls from "../util/urls";
import { submitComment } from "../redux/actions/postAction";
import { connect } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
function CommentForm({ postId, type, openSearchMovie, submitComment }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postMovie, setPostMovie] = useState({});
  const [comment, setComment] = useState("");

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
  // const handleUserEvents = useCallback((event) => {
  //   const { key, keyCode } = event;
  //   console.log(event);
  //   if (keyCode === 13) {
  //     console.log("hello");
  //     const postComment = {
  //       postId: postId,
  //       comment: comment,
  //     };
  //     console.log(postComment);
  //   }
  // }, []);
  // useEffect(() => {
  //   document
  //     .getElementById(postId)
  //     .addEventListener("keypress", handleUserEvents);
  //   return () => {
  //     document
  //       .getElementById("commentTextArea")
  //       .removeEventListener("keypress", handleUserEvents);
  //   };
  // }, [handleUserEvents]);
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
  const handlePostComment = (event) => {
    event.preventDefault();
    // console.log(event.which);
    if (type === "review") {
      const postReviewComment = {
        postId: postId,
        comment: comment,
        postType: type,
      };
      console.log(postReviewComment);
      setComment("");
      event.target.textcomment.value = "";

      submitComment(postReviewComment);
    } else if (type === "suggestMe") {
      if (Object.keys(postMovie).length === 0) {
        const postSuggestMeCommentWithoutMovie = {
          postId: postId,
          comment: comment,

          postType: type,
        };
        console.log(postSuggestMeCommentWithoutMovie);
        setComment("");
        event.target.textcomment.value = "";
        submitComment(postSuggestMeCommentWithoutMovie);
      } else {
        const postSuggestMeCommentWithMovie = {
          postId: postId,
          comment: comment === "" ? "I am recommending this movie" : comment,
          movieTitle: postMovie.title ? postMovie.title : postMovie.name,
          postType: type,
          moviePoster: postMovie.poster_path,
          releaseYear: postMovie.release_date.split("-")[0],
          genreId: postMovie.genre_ids,
          overview: postMovie.overview,
          movieId: postMovie.id,
        };
        setPostMovie({});
        setComment("");
        console.log(postSuggestMeCommentWithMovie);
        event.target.textcomment.value = "";
        submitComment(postSuggestMeCommentWithMovie);
      }
    }
  };
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
                  src={
                    postMovie.poster_path !== null
                      ? `${urls.movieBaseUrl}w92${postMovie.poster_path}`
                      : urls.movieNoPoster
                  }
                  alt={postMovie.title}
                />
              </div>
              <div className="commentForm__moviePreview__movieInfo">
                <div className="commentForm__moviePreview__movieInfo__title">
                  <h3>{postMovie.title ? postMovie.title : postMovie.name}</h3>
                  <IconButton onClick={() => setPostMovie({})}>
                    <ClearIcon />
                  </IconButton>
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
      <form onSubmit={handlePostComment} method="POST">
        <div className="commentForm__input">
          <div className="commentForm__inputTextArea">
            {/* <script src="https://rawgit.com/jackmoore/autosize/master/dist/autosize.min.js"></script> */}
            <textarea
              cols={65}
              rows={1}
              name="textcomment"
              placeholder="Add a comment ..."
              autoComplete="off"
              autoCorrect="off"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              // style="height: 16px;"
            ></textarea>
          </div>
          <Button
            type="Submit"
            disabled={
              comment === "" && Object.keys(postMovie).length === 0
                ? true
                : false
            }
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default connect(null, { submitComment })(CommentForm);
