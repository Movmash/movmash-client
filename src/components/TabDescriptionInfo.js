import React, { useState, useEffect } from "react";
import {
  IconButton,
  TextField,
  Button,
  Radio,
  CircularProgress,
  ClickAwayListener,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./stylesheets/TabDescriptionInfo.css";
import Dialog from "@material-ui/core/Dialog";
import SearchMovieCard from "./SearchMovieCard";
import Axios from "../util/axios";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { genreConverter } from "../util/genreConverter";
import stringLimiter from "../util/stringLimiter";
import { connect } from "react-redux";
import { createNewList } from "../redux/actions/dataAction";
// import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
function TabDescriptionInfo({ Icon, info, isButton, createNewList }) {
  const [openDialog, setDailogOpen] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInText, setTagsInText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [privacy, setPrivacy] = useState("");
  //  const [disableButton, setButtonDisabled] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const fetchSearchResult = () => {
      if (query !== "") {
        Axios.get(
          `/api/v1/movie/search-movie?query=${query}`
        )
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
  const handleClickOpen = () => {
    setDailogOpen(true);
  };
  const handleClose = () => {
    setDailogOpen(false);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const handleOnClickSearchCard = (result) => {
    setOpen((prev) => (prev = false));
    // console.log(result);
    setMovieList((prev) => [...prev, result]);
    console.log(movieList);
    setQuery("");
    console.log(genreConverter(result.genre_ids));
  };
  const handleOnChange = (event) => {
    if (event.target.value === "") {
      console.log("heelloo");
      setOpen((prev) => (prev = false));
    } else setOpen(true);
  };
  const handleRemoveMovie = (movieId) => {
    setMovieList((prev) => prev.filter((movie) => movie.id !== movieId));
  };
  const handlePrivacyPreference = (e) => {
    setPrivacy(e.target.value);
  };
  const resetTheState = () => {
    setMovieList([]);
    setListDescription("");
    setPrivacy("");
    setTags([]);
    setListTitle("");
    setTagsInText("");
  };
  const handleCreateList = () => {
    const newList = {
      movieList: movieList,
      listTitle: listTitle,
      description: listDescription,
      privacy: privacy,
      tags: tags,
    };
    createNewList(newList);
    handleClose();
    resetTheState();
  };
  return (
    <div className="tabDescriptionInfo">
      <div className="tabDescriptionInfo__logo">
        <Icon />
      </div>
      <div className="tabDescriptionInfo__description">
        <span>{info}</span>
      </div>
      {isButton && (
        <div className="tabDescriptionInfo__button">
          <div className="leftSideBar__container__icons--add">
            <IconButton onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </div>
          <Dialog onClose={handleClose} open={openDialog}>
            <div className="dialog__list">
              {/* title */}
              {/* description */}

              {/* add your movie */}
              <div className="createPartyForm__heading">
                <h1>Create List</h1>
              </div>
              <div className="createPartyForm__container">
                <div className="createPartyForm__roomTitle">
                  {/* <div className="createPartyForm__roomTitle__title">
          <span>Room Title</span>
        </div> */}
                  <div className="createPartyForm__roomTitle__input">
                    <TextField
                      id="outlined-full-width"
                      label="List Title"
                      onChange={(e) => setListTitle(e.target.value)}
                      // style={{ margin: 30 }}
                      placeholder="My time loop related movies"
                      // helperText="Full width!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="createPartyForm__roomDescription">
                  <div className="createPartyForm__roomDescription__title"></div>
                  <div className="createPartyForm__roomDescription__input">
                    <TextField
                      id="outlined-full-width"
                      label="Description"
                      placeholder="This is the amazing collection with unique time traveling concept"
                      fullWidth
                      onChange={(e) => setListDescription(e.target.value)}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="createPartyForm__contentSelection searchYourMovie">
                  <div className="createPartyForm__contentSelection__question">
                    <h3>Search and add your movie : </h3>
                  </div>

                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                      <TextField
                        onChange={(event) => {
                          handleOnChange(event);
                          setQuery(event.target.value);
                        }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Search ..."
                        id="standard-basic"
                        label="Search Your Movie"
                        variant="outlined"
                        value={query}
                      />
                      {open &&
                        (loading ? (
                          <div className="postReview-clickAwayListener--content searchInput__Loading myProfileDialog">
                            <CircularProgress />
                          </div>
                        ) : searchResult.length === 0 && query !== "" ? (
                          <div className="postReview-clickAwayListener--content searchInput__NotFound myProfileDialog">
                            <h3>0 results are found</h3>
                          </div>
                        ) : (
                          <div className="postReview-clickAwayListener--content myProfileDialog">
                            {searchResult.map((result) => (
                              <SearchMovieCard
                                select={() => handleOnClickSearchCard(result)}
                                key={result.id}
                                id={result.id}
                                poster={result.poster_path}
                                releaseDate={result.release_date}
                                title={
                                  result.title ? result.title : result.name
                                }
                              />
                            ))}
                          </div>
                        ))}
                    </div>
                  </ClickAwayListener>
                </div>
                <div className="tabDescriptionInfo__selectedMovieList">
                  {movieList.map((movie) => (
                    <div
                      key={movie.id}
                      className="tabDescriptionInfo__selectedMovie"
                    >
                      <div className="tabDescriptionInfo__selectedMovie__details">
                        {" "}
                        {movie.poster_path !== null ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                            alt={movie.title}
                          />
                        ) : (
                          <img
                            src="https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                            alt={movie.title}
                          />
                        )}
                        <span>
                          {" "}
                          {movie.title === undefined
                            ? stringLimiter(movie.name, 30)
                            : stringLimiter(movie.title, 30)}{" "}
                          (
                          {movie.release_date !== undefined &&
                            movie.release_date.split("-")[0]}
                          )
                        </span>
                      </div>
                      <HighlightOffIcon
                        onClick={() => handleRemoveMovie(movie.id)}
                        className="closeIcon"
                      />
                    </div>
                  ))}
                </div>
                <div className="createPartyForm__contentSelection">
                  <div className="createPartyForm__contentSelection__question">
                    <h3>Add tags for your list : </h3>
                  </div>
                  <div className="createPartyForm__contentSelection__urlInput">
                    <TextField
                      id="outlined-full-width"
                      label="tags"
                      placeholder="e.g: timetravel, loop, animated, actions"
                      onChange={(e) => {
                        setTagsInText(e.target.value);
                        setTags(tagsInText.split(","));
                        console.log(tags);
                      }}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="createPartyForm__privacySelection">
                  <div className="createPartyForm__privacySelection__question">
                    <h3>My list should be in :</h3>
                  </div>
                  <div className="createPartyForm__privacySelection_radioButton">
                    <div className="createPartyForm__privacySelection_radioButton__public">
                      {" "}
                      <Radio
                        checked={privacy === "Public"}
                        onChange={handlePrivacyPreference}
                        value="Public"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <span>Public</span>
                    </div>
                    <div className="createPartyForm__privacySelection_radioButton__public">
                      <Radio
                        checked={privacy === "Private"}
                        onChange={handlePrivacyPreference}
                        value="Private"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <span>Private</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="createPartyForm__actionButtons">
                <div className="createPartyForm__actionButton">
                  <Button
                    onClick={() => {
                      handleClose();
                      resetTheState();
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </div>
                <div className="createPartyForm__actionButton">
                  <Button
                    onClick={handleCreateList}
                    // disabled={ratingPreference === 0 ? true : false}
                    variant="contained"
                    color="primary"
                  >
                    Create List
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default connect(null, { createNewList })(TabDescriptionInfo);
