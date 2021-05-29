import React, { useEffect, useState } from "react";
import "./stylesheets/ProfileList.css";
import TabDescriptionInfo from "./TabDescriptionInfo";
import VideoLibraryTwoToneIcon from "@material-ui/icons/VideoLibraryTwoTone";
import {
  Radio,
  TextField,
  CircularProgress,
  ClickAwayListener,
  Dialog,
} from "@material-ui/core";
import ListCard from "./ListCard";
import AddIcon from "@material-ui/icons/Add";
import { genreConverter } from "../util/genreConverter";
import { connect } from "react-redux";
import stringLimiter from "../util/stringLimiter";
import Axios from "../util/axios";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  getUserList,
  getMashUserList,
  createNewList,
  resetState,
} from "../redux/actions/dataAction";
import TabLoadingData from "./TabLoadingData";
import SearchMovieCard from "./SearchMovieCard";
import DialogHeader from "./DialogHeader";
function ProfileList({
  isMyProfile,
  getUserList,
  userName,
  getMashUserList,
  profileList,
  infoListLoading,
  createNewList,
  resetState,
}) {
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
  useEffect(() => {
    if (isMyProfile) {
      getUserList();
    } else {
      getMashUserList(userName);
      console.log(userName);
    }
    return () => {
      resetState();
    };
  }, [isMyProfile, getUserList, userName, getMashUserList, resetState]);
  return (
    <div className="profileList">
      {infoListLoading ? (
        <TabLoadingData />
      ) : profileList.length !== 0 ? (
        <>
          {isMyProfile && (
            <div onClick={handleClickOpen} className="profileList__heading">
              <h2>Create new list</h2>

              <AddIcon />
            </div>
          )}

          <div className="profileList__content">
            {profileList.map((list) => {
              console.log(list);
              return (
                  <div key={list._id} className="profileList__container">
                    <ListCard
                      id={list._id}
                      createdBy={list.createdBy}
                      listTitle={list.listTitle}
                      description={list.description}
                      movieList={list.movieList}
                      privacyValue={list.privacy}
                      tagArray={list.tags}
                      isMyProfile={isMyProfile}
                    />
                  </div>
              );
            })}
          </div>
          <Dialog onClose={handleClose} open={openDialog}>
            <div className="dialog__list">
              <DialogHeader
                heading="Create list"
                close={() => {
                  handleClose();
                  resetTheState();
                }}
                left={21.5}
              />
              {/* <div className="createPartyForm__heading">
                <h1>Create List</h1>
              </div> */}
              <div className="createPartyForm__container">
                <div className="createPartyForm__roomTitle">
                  <div className="createPartyForm__roomTitle__input">
                    <TextField
                      id="outlined-full-width"
                      label="List Title"
                      onChange={(e) => setListTitle(e.target.value)}
                      placeholder="My time loop related movies"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      autoComplete="off"
                      variant="filled"
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
                      autoComplete="off"
                      variant="filled"
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
                        autoComplete="off"
                        variant="filled"
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
                      autoComplete="off"
                      variant="filled"
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
                <div className={`createPartyForm__actionButton ${!(movieList.length !== 0 && privacy !== "")&& "disabled"}`}>
                  <button
                    onClick={handleCreateList}
                    variant="contained"
                    color="primary"
                    disabled = {!(movieList.length !== 0 && privacy !== "")}
                  >
                    Create List
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <TabDescriptionInfo
          isButton={isMyProfile}
          info={
            isMyProfile
              ? "create your movie list so that people can find you who have same choice of movies like you"
              : "No List available"
          }
          Icon={VideoLibraryTwoToneIcon}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profileList: state.data.profileLists,
    infoListLoading: state.data.infoListLoading,
  };
};

export default connect(mapStateToProps, {
  getUserList,
  getMashUserList,
  createNewList,
  resetState,
})(ProfileList);
