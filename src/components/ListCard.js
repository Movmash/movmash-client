import React, { useState, useEffect } from "react";
import "./stylesheets/ListCard.css";
import {
  Avatar,
  Button,
  Radio,
  TextField,
  CircularProgress,
  ClickAwayListener,
  Dialog,
} from "@material-ui/core";
import stringLimiter from "../util/stringLimiter";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditIcon from "@material-ui/icons/Edit";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { connect } from "react-redux";
import { deleteList, updateList } from "../redux/actions/dataAction";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { genreConverter } from "../util/genreConverter";
import Axios from "../util/axios";

import SearchMovieCard from "./SearchMovieCard";
function ListCard({
  createdBy,
  description,
  listTitle,
  movieList,
  deleteList,
  id,
  privacyValue,
  tagArray,
  updateList,
  isMyProfile,
}) {
  const [info, setShowInfo] = useState(false);
  const [openDialog, setDailogOpen] = useState(false);
  const [movieListInDialog, setMovieList] = useState(movieList);
  const [listTitleInText, setListTitle] = useState(listTitle);
  const [listDescription, setListDescription] = useState(description);
  const [tags, setTags] = useState(tagArray);
  const [tagsInText, setTagsInText] = useState(tagArray.join(","));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [privacy, setPrivacy] = useState(privacyValue);
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

  const handleCreateList = () => {
    if (movieListInDialog.length !== 0) {
      const newList = {
        id: id,
        movieList: movieListInDialog,
        listTitle: listTitleInText,
        description: listDescription,
        privacy: privacy,
        tags: tags,
      };
      updateList(newList);
      // createNewList(newList);
      handleClose();
    } else {
      deleteList(id);
      handleClose();
    }
  };
  return (
    <div className="listCard">
      <div className="listCard__header">
        <div className="search__content__avatar listCardHeader">
          <Avatar src={createdBy.profileImageUrl} />
          <span>{createdBy.userName}</span>
        </div>
        {isMyProfile && (
          <div className="listCard__headerButtons">
            <EditIcon onClick={() => handleClickOpen()} />
            <CloseOutlinedIcon onClick={() => deleteList(id)} />
          </div>
        )}

        <Dialog onClose={handleClose} open={openDialog}>
          <div className="dialog__list">
            <div className="createPartyForm__heading">
              <h1>Create List</h1>
            </div>
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
                    value={listTitleInText}
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
                    value={listDescription}
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
                              title={result.title ? result.title : result.name}
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                </ClickAwayListener>
              </div>
              <div className="tabDescriptionInfo__selectedMovieList">
                {movieListInDialog.map((movie) => (
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
                    value={tagsInText}
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
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="listCard__banner">
        {movieList.length !== 0 && movieList[0].backdrop_path !== null ? (
          <img
            src={`https://image.tmdb.org/t/p/w300/${movieList[0].backdrop_path}`}
            alt={movieList[0].title}
          />
        ) : (
          <img
            src="https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
            alt={movieList[0].title}
          />
        )}
        <div className="listCard__bannerSkin"></div>
        <h1>{stringLimiter(listTitle, 45)}</h1>
      </div>

      <div className="listCard__infoButton">
        <ArrowBackIcon
          onClick={() => setShowInfo(false)}
          style={{ visibility: `${!info ? "hidden" : "visible"}` }}
        />
        <InfoOutlinedIcon onClick={() => setShowInfo(true)} />
      </div>
      {!info ? (
        <>
          <div className="listCard__movieList">
            {movieList.map((movie) => (
              <div key={movie.id} className="listCard__movieItem">
                {movie.poster_path !== null ? (
                  <img
                    className="listCard__moviePoster"
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <img
                    className="listCard__moviePoster"
                    src="https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                    alt={movie.title}
                  />
                )}
                <h4>
                  {movie.title === undefined
                    ? stringLimiter(movie.name, 30)
                    : stringLimiter(movie.title, 30)}{" "}
                  (
                  {movie.release_date !== undefined &&
                    movie.release_date.split("-")[0]}
                  )
                </h4>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="listCard__description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default connect(null, { deleteList, updateList })(ListCard);
{
  /*{ createdBy, id, listTitle, description, movieList }
  https://cdn.pastemagazine.com/www/articles/2016/01/21/ProphetEW_Main.jpg 
  <div className="liveShowCard__banner__content">
          <div className="liveShowCard__banner__content__left">
            <button className="button_icon">
              <InfoOutlinedIcon />
            </button>
          </div>
          <div className="liveShowCard__banner__content__right">
            <div className="liveShowCard__banner__content__right__topButton">
              <button className="button_icon">
                <PersonIcon /> <span> {memberNumber}</span>
              </button>
            </div>

            <div className="liveShowCard__banner__content__right__bottomButton">
              {" "}
              <button
                onClick={() => handleJoinParty(roomCode)}
                className="button_icon"
              >
                Join Party
              </button>
            </div>
          </div>
        </div>
      
       */
}
