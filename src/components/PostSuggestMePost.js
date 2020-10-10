import React, { useState } from "react";
import { removeItemOnce } from "../util/arrayItemDeleter";
import "./stylesheets/PostSuggestMePost.css";
import {
  Radio,
  IconButton,
  ClickAwayListener,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function PostSuggestMePost({ closeSuggestMe }) {
  const [ratingPreference, setRatingValue] = useState(0);
  const [chooseGenre, setChooseGenre] = useState([]);
  const [selectedRatingAbove, setSelectedRatingAbove] = useState("");
  const [open, setOpen] = React.useState(false);
  const [checkAction, setAction] = useState(false);
  const [checkComedy, setComedy] = useState(false);
  const [checkHorror, setHorror] = useState(false);
  const [checkRomance, setRomance] = useState(false);
  const [checkDocumentary, setDocumentary] = useState(false);
  const [checkAdventure, setAdventure] = useState(false);
  const [checkAnimation, setAnimation] = useState(false);
  const [checkDrama, setDrama] = useState(false);
  const [checkCrime, setCrime] = useState(false);
  const [checkFamily, setFamily] = useState(false);
  const [checkFantasy, setFantasy] = useState(false);
  const [checkHistory, setHistory] = useState(false);
  const [checkMusic, setMusic] = useState(false);
  const [checkMystery, setMystery] = useState(false);
  const [checkSciFi, setSciFi] = useState(false);
  const [checkTV, setTV] = useState(false);
  const [checkThriller, setThriller] = useState(false);
  const [checkWar, setWar] = useState(false);
  const [checkWestern, setWestern] = useState(false);

  const [languagePrefered, setLanguagePreference] = useState("Any Language");

  const [durationPreference, setDurationPrference] = useState("Any duration");

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };
  const handleCheckBox = (event) => {
    switch (event.target.name) {
      case "Action":
        setAction(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Action"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Action"));
        break;
      case "Comedy":
        setComedy(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Comedy"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Comedy"));
        break;
      case "Horror":
        setHorror(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Horror"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Horror"));
        break;
      case "Romance":
        setRomance(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Romance"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Romance"));
        break;
      case "Documentary":
        setDocumentary(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Documentary"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Documentary"));
        break;
      case "Adventure":
        setAdventure(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Adventure"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Adventure"));
        break;
      case "Animation":
        setAnimation(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Animation"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Animation"));
        break;
      case "Drama":
        setDrama(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Drama"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Drama"));
        break;
      case "Crime":
        setCrime(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Crime"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Crime"));
        break;
      case "Family":
        setFamily(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Family"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Family"));
        break;
      case "Fantasy":
        setFantasy(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Fantasy"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Fantasy"));
        break;
      case "History":
        setHistory(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "History"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "History"));
        break;
      case "Music":
        setMusic(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Music"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Music"));
        break;
      case "Mystery":
        setMystery(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Mystery"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Mystery"));
        break;
      case "SciFi":
        setSciFi(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Sci-Fi"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Sci-Fi"));
        break;
      case "TV":
        setTV(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "TV"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "TV"));
        break;
      case "Thriller":
        setThriller(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Thriller"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Thriller"));
        break;
      case "War":
        setWar(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "War"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "War"));
        break;
      case "Western":
        setWestern(event.target.checked);
        if (event.target.checked)
          setChooseGenre((prev) => {
            return [...prev, "Western"];
          });
        else setChooseGenre(removeItemOnce(chooseGenre, "Western"));
        break;

      default:
        console.log("default");
        break;
    }
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleRatingRadioChange = (event) => {
    setSelectedRatingAbove(event.target.value);
  };

  const handleLanguagePreference = (event) => {
    setLanguagePreference(event.target.value);
  };

  const handleDurationPreference = (event) => {
    setDurationPrference(event.target.value);
  };

  return (
    <div className="postSuggestMe">
      <div className="postSuggestMe__captionInput"></div>
      <div className="postSuggestMe__ratingStep">
        <div className="postSuggestMe__ratingStep__heading">
          <h3 className="postSuggestMe--label">Rating preference :</h3>
        </div>
        <div className="postSuggestMe__ratingStep__content">
          <div className="postSuggestMe__ratingStep__content__input">
            <div className="postSuggestMe__ratingStep__content__input--slider">
              <input
                className="slider-rating"
                type="range"
                min="0"
                max="100"
                defaultValue="0"
                onChange={(e) => {
                  setRatingValue(e.target.value / 10);
                }}
              />
            </div>
            <div className="postSuggestMe__ratingStep__content__input--radioInput">
              <div className="postSuggestMe__ratingStep__content__input--radioInput_material">
                <Radio
                  checked={selectedRatingAbove === "above"}
                  onChange={handleRatingRadioChange}
                  value="above"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <h4>Above</h4>
              </div>
              <div className="postSuggestMe__ratingStep__content__input--radioInput_material">
                <Radio
                  checked={selectedRatingAbove === "below"}
                  onChange={handleRatingRadioChange}
                  value="below"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <h4>Below</h4>
              </div>
            </div>
          </div>
          <div className="postSuggestMe__ratingStep__content__text">
            <div className="postSuggestMe__ratingStep__content__text--heading">
              <h4>
                Rating{" "}
                {selectedRatingAbove !== ""
                  ? selectedRatingAbove === "above"
                    ? "Above"
                    : "Below"
                  : ""}
              </h4>
            </div>
            <div className="postSuggestMe__ratingStep__content__text--content">
              <h1>{ratingPreference}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="postSuggestMe__genreStep">
        <div className="postSuggestMe__genreStep__heading">
          <h3 className="postSuggestMe--label">Choose genres :</h3>
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
                  <div className="postSuggestMe__genreStep__content__genre-menu">
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
      <div className="postSuggestMe__languageNgenreStep">
        <div className="postSuggestMe__runtimeRange">
          <div className="postSuggestMe__runtimeRange__heading">
            <h3>Runtime range :</h3>
          </div>
          <div className="postSuggestMe__runtimeRange__content">
            <div className="postSuggestMe__runtimeRange__content__input">
              <div className="postSuggestMe__ratingStep__content__input--radioInput_material">
                <Radio
                  checked={durationPreference === "Any duration"}
                  onChange={handleDurationPreference}
                  value="Any duration"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <h4>Any duration</h4>
              </div>
              <div className="postSuggestMe__ratingStep__content__input--radioInput_material">
                <Radio
                  checked={durationPreference === "Under 2 hr"}
                  onChange={handleDurationPreference}
                  value="Under 2 hr"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <h4>Under 2 hr</h4>
              </div>
              <div className="postSuggestMe__ratingStep__content__input--radioInput_material">
                <Radio
                  checked={durationPreference === "Above 2 hr"}
                  onChange={handleDurationPreference}
                  value="Above 2 hr"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <h4>Above 2 hr</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="postSuggestMe__languageStep">
          <div className="postSuggestMe__languageStep__heading">
            <h3>Language :</h3>
          </div>
          <div className="postSuggestMe__languageStep__content">
            <div className="postSuggestMe__languageStep__content__input">
              <div className="postSuggestMe__ratingStep__content__input--radioInput_material">
                <Radio
                  checked={languagePrefered === "Any Language"}
                  onChange={handleLanguagePreference}
                  value="Any Language"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <h4>Any Language</h4>
              </div>
              <div className="postSuggestMe__ratingStep__content__input--radioInput_material">
                <Radio
                  checked={languagePrefered === "English"}
                  onChange={handleLanguagePreference}
                  value="English"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <h4>English</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="postSuggestMe__buttons">
        <div className="postReviewPost__bottomIcon">
          <Button onClick={closeSuggestMe} variant="outlined" color="secondary">
            Cancel
          </Button>
        </div>
        <div className="postReviewPost__bottomIcon">
          <Button
            disabled={ratingPreference === 0 ? true : false}
            variant="contained"
            color="primary"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostSuggestMePost;
