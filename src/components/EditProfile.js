import { Checkbox, ClickAwayListener, FormControlLabel, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import DialogHeader from './DialogHeader';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./stylesheets/EditProfile.css";
import Axios from "../util/axios";
import {connect} from "react-redux";
import { updateUserInfo } from "../redux/actions/userAction";
import { useHistory } from 'react-router-dom';
function EditProfile({ close, user, updateUserInfo }) {
  const [fullName, setFullName] = useState(user.fullName);
  const [userName, setUserName] = useState(user.userName);
  const history = useHistory();
  const [bio, setBio] = useState(user.bio);
  const [chooseGenre, setChooseGenre] = useState(user.genre);
  const [open, setOpen] = useState(false);
  const [checkAction, setAction] = useState(user.genre.includes("Action"));
  const [checkComedy, setComedy] = useState(user.genre.includes("Comedy"));
  const [checkHorror, setHorror] = useState(user.genre.includes("Horror"));
  const [checkRomance, setRomance] = useState(user.genre.includes("Romance"));
  const [checkDocumentary, setDocumentary] = useState(
    user.genre.includes("Documentary")
  );
  const [checkAdventure, setAdventure] = useState(
    user.genre.includes("Adventure")
  );
  const [checkAnimation, setAnimation] = useState(
    user.genre.includes("Animation")
  );
  const [checkDrama, setDrama] = useState(user.genre.includes("Drama"));
  const [checkCrime, setCrime] = useState(user.genre.includes("Crime"));
  const [checkFamily, setFamily] = useState(user.genre.includes("Family"));
  const [checkFantasy, setFantasy] = useState(user.genre.includes("Fantasy"));
  const [checkHistory, setHistory] = useState(user.genre.includes("History"));
  const [checkMusic, setMusic] = useState(user.genre.includes("Music"));
  const [checkMystery, setMystery] = useState(user.genre.includes("Mystery"));
  const [checkSciFi, setSciFi] = useState(user.genre.includes("Sci-Fi"));
  const [checkTV, setTV] = useState(user.genre.includes("TV"));
  const [checkThriller, setThriller] = useState(
    user.genre.includes("Thriller")
  );
  const [checkWar, setWar] = useState(user.genre.includes("War"));
  const [checkWestern, setWestern] = useState(user.genre.includes("Western"));
  const [isUserNameAvailable, setUserNameAvailable] = useState(null);
  const checkUserName = (userName) => {
    if (userName !== "") {
      if (userName.split(" ").length === 1) {
        Axios.get(`/api/v1/home/check-username-availability/${userName}`)
          .then((res) => {
            // console.log(res.data);
            setUserNameAvailable(res.data.availability);
          })
          .catch((e) => {
            // console.log(e);
          });
      } else {
        setUserNameAvailable("");
      }
    } else {
      setUserNameAvailable("");
    }
  };

  const handleCheckBox = (event) => {
    switch (event.target.name) {
      case "Action":
        setAction(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Action"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Action"));
        break;
      case "Comedy":
        setComedy(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Comedy"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Comedy"));
        break;
      case "Horror":
        setHorror(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Horror"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Horror"));
        break;
      case "Romance":
        setRomance(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Romance"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Romance"));
        break;
      case "Documentary":
        setDocumentary(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Documentary"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Documentary"));
        break;
      case "Adventure":
        setAdventure(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Adventure"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Adventure"));
        break;
      case "Animation":
        setAnimation(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Animation"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Animation"));
        break;
      case "Drama":
        setDrama(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Drama"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Drama"));
        break;
      case "Crime":
        setCrime(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Crime"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Crime"));
        break;
      case "Family":
        setFamily(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Family"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Family"));
        break;
      case "Fantasy":
        setFantasy(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Fantasy"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Fantasy"));
        break;
      case "History":
        setHistory(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "History"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "History"));
        break;
      case "Music":
        setMusic(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Music"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Music"));
        break;
      case "Mystery":
        setMystery(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Mystery"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Mystery"));
        break;
      case "SciFi":
        setSciFi(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Sci-Fi"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Sci-Fi"));
        break;
      case "TV":
        setTV(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "TV"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "TV"));
        break;
      case "Thriller":
        setThriller(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Thriller"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Thriller"));
        break;
      case "War":
        setWar(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "War"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "War"));
        break;
      case "Western":
        setWestern(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Western"];
          });
        else setChooseGenre((prev)=>prev.filter(movie => movie !== "Western"));
        break;

      default:
        // console.log("default");
        break;
    }
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const userInfo = {
      fullName: fullName,
      userName: userName,
      bio: bio,
      genre: chooseGenre,
    };
    updateUserInfo(userInfo, history);
  };
  return (
    <div className="editProfile">
      <div className="postReviewPost__DialogHeader">
        <DialogHeader heading="Edit Profile" close={close} left={25} />
      </div>
      <div className="postSuggestMe__mainContent">
        <div className="createPartyForm__roomTitle editProfileInput">
          <div className="createPartyForm__roomTitle__input">
            <TextField
              id="outlined-full-width"
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              // placeholder="Horror Night"
              fullWidth
              margin="normal"
              variant="filled"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="createPartyForm__roomTitle editProfileInput">
          <div className="createPartyForm__roomTitle__input">
            <TextField
              id="outlined-full-width"
              label="Username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                checkUserName(e.target.value);
              }}
              // placeholder="Horror Night"
              fullWidth
              margin="normal"
              variant="filled"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {isUserNameAvailable !== null &&
              (isUserNameAvailable === true ? (
                <p className={`warning_Message green`}>
                  This username is available
                </p>
              ) : (
                <p className={`warning_Message red`}>
                  {isUserNameAvailable === ""
                    ? "The username is invalid"
                    : "This username already exist"}
                </p>
              ))}
          </div>
        </div>
        <div className="postSuggestMe__genreStep editProfileGenreSelection">
          <div className="postSuggestMe__genreStep__heading">
            <h3 className="postSuggestMe--label">
              Which genres you see in yourself:{" "}
            </h3>
          </div>
          <div className="postSuggestMe__genreStep__content">
            <div className="postSuggestMe__genreStep__content__heading">
              <h3>Genre</h3>
            </div>
            <div className="postSuggestMe__genreStep__content__content">
              <div className="postSuggestMe__genreStep__content__content--text">
                <h3>
                  {chooseGenre.length === 0 || chooseGenre.length > 4
                    ? "Any Genre"
                    : chooseGenre.join(" | ")}
                </h3>
              </div>

              <ClickAwayListener onClickAway={handleClickAway}>
                <div className="postSuggestMe__genreStep__content__genre-list">
                  <div className="postSuggestMe__genreStep__content__content--iconButton">
                    <IconButton onClick={handleClick}>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </div>
                  {open ? (
                    <div className="postSuggestMe__genreStep__content__genre-menu editProfileGenre">
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkAction}
                                onChange={handleCheckBox}
                                name="Action"
                              />
                            }
                            label="Action"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkComedy}
                                onChange={handleCheckBox}
                                name="Comedy"
                              />
                            }
                            label="Comedy"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkHorror}
                                onChange={handleCheckBox}
                                name="Horror"
                              />
                            }
                            label="Horror"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkRomance}
                                onChange={handleCheckBox}
                                name="Romance"
                              />
                            }
                            label="Romance"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkDocumentary}
                                onChange={handleCheckBox}
                                name="Documentary"
                              />
                            }
                            label="Documentary"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkAdventure}
                                onChange={handleCheckBox}
                                name="Adventure"
                              />
                            }
                            label="Adventure"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkAnimation}
                                onChange={handleCheckBox}
                                name="Animation"
                              />
                            }
                            label="Animation"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkDrama}
                                onChange={handleCheckBox}
                                name="Drama"
                              />
                            }
                            label="Drama"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkCrime}
                                onChange={handleCheckBox}
                                name="Crime"
                              />
                            }
                            label="Crime"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkFamily}
                                onChange={handleCheckBox}
                                name="Family"
                              />
                            }
                            label="Family"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkFantasy}
                                onChange={handleCheckBox}
                                name="Fantasy"
                              />
                            }
                            label="Fantasy"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkHistory}
                                onChange={handleCheckBox}
                                name="History"
                              />
                            }
                            label="History"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkMusic}
                                onChange={handleCheckBox}
                                name="Music"
                              />
                            }
                            label="Music"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkMystery}
                                onChange={handleCheckBox}
                                name="Mystery"
                              />
                            }
                            label="Mystery"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkSciFi}
                                onChange={handleCheckBox}
                                name="SciFi"
                              />
                            }
                            label="Sci-Fi"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkTV}
                                onChange={handleCheckBox}
                                name="TV"
                              />
                            }
                            label="TV"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkThriller}
                                onChange={handleCheckBox}
                                name="Thriller"
                              />
                            }
                            label="Thriller"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkWar}
                                onChange={handleCheckBox}
                                name="War"
                              />
                            }
                            label="War"
                          />
                        </div>
                      </div>
                      <div className="postSuggestMe__genreStep__content__genre-menuItem">
                        <div className="postSuggestMe__genreStep__content__genre-menuItem--container">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkWestern}
                                onChange={handleCheckBox}
                                name="Western"
                              />
                            }
                            label="Western"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </ClickAwayListener>
            </div>
          </div>
        </div>
        <div className="createPartyForm__roomTitle editProfileInput">
          {/* <div className="postReviewPost__contentInfo--reviewContent"> */}
          <TextField
            name="reviewContent"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={5}
            variant="filled"
            inputProps={{ maxLength: 300 }}
          />
          {/* </div> */}
        </div>
      </div>
      <div className="postSuggestMe__buttons">
        <div
          className={`postReviewPost__bottomIcon ${
            user.genre.join("") === chooseGenre.join("") &&
            user.bio === bio &&
            user.fullName === fullName &&
            (isUserNameAvailable === false ||
              isUserNameAvailable === "" ||
              isUserNameAvailable === null) &&
            "disabled"
          }`}
        >
          <button
            onClick={() => handleSubmit()}
            disabled={
              user.genre.join("") === chooseGenre.join("") &&
              user.bio === bio &&
              user.fullName === fullName &&
              (isUserNameAvailable === false ||
                isUserNameAvailable === "" ||
                isUserNameAvailable === null)
              // user.bio === bio
            }
            type="submit"
            style={{ width: "63.5ch" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { updateUserInfo })(EditProfile);
