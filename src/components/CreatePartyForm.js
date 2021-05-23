import React, { useState } from "react";
import "./stylesheets/CreatePartyForm.css";
import TextField from "@material-ui/core/TextField";
// import { removeItemOnce } from "../util/arrayItemDeleter";
import { Radio } from "@material-ui/core";
import { connect } from "react-redux";
import { createLiveShow } from "../redux/actions/liveShowAction";
import { useHistory } from "react-router-dom";
import DialogHeader from "./DialogHeader";
// import axios from "axios";
function CreatePartyForm({ closeCreateTheatrDialog, createLiveShow }) {
  const [privacy, setPrivacy] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const history = useHistory();
  const handlePrivacyPreference = (e) => {
    setPrivacy(e.target.value);
  };
  const handleGenrePreference = (e) => {
    setGenre(e.target.value);
  };
  const handleCreateParty = () => {
    const roomDetail = {
      roomTitle: roomTitle,
      description: description,
      privacy: privacy,
      videoUrl: videoUrl,
      genre: genre,
    };
    // console.log(roomDetail);
    createLiveShow(roomDetail, history);

    // closeCreateTheatrDialog();
  };
  return (
    <div className="createPartyForm">
      <DialogHeader
        heading="Create Party"
        close={closeCreateTheatrDialog}
        left={22.5}
      />
      <div className="createPartyForm__container">
        <div className="createPartyForm__roomTitle">
          <div className="createPartyForm__roomTitle__input">
            <TextField
              id="outlined-full-width"
              label="Room Title"
              onChange={(e) => setRoomTitle(e.target.value)}
              placeholder="Horror Night"
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
        <div className="createPartyForm__roomDescription">
          <div className="createPartyForm__roomDescription__title"></div>
          <div className="createPartyForm__roomDescription__input">
            <TextField
              id="outlined-full-width"
              label="Description"
              autoComplete="off"
              placeholder="let's hangout together !!"
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              variant="filled"
              rows={3}
            />
          </div>
        </div>
        <div className="createPartyForm__contentSelection">
          <div className="createPartyForm__contentSelection__question">
            <h3>What you wanna host : </h3>
          </div>
          <div className="createPartyForm__contentSelection__urlInput">
            <TextField
              id="outlined-full-width"
              label="video url"
              placeholder="e.g: https://www.youtube.com/watch?v=o2-wA-N04PA"
              onChange={(e) => setVideoUrl(e.target.value)}
              fullWidth
              autoComplete="off"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </div>
        </div>
        <div className="createPartyForm__genreSelections">
          <div className="createPartyForm__contentSelection__question">
            <h3>What is your genre of your video :</h3>
          </div>
          <div className="createPartyForm__genreSelections__contents">
            {" "}
            <div className="createPartyForm__genreSelections__content">
              {" "}
              <div className="createPartyForm__privacySelection_radioButton__public">
                {" "}
                <Radio
                  checked={genre === "Action"}
                  onChange={handleGenrePreference}
                  value="Action"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Action</span>
              </div>
              <div className="createPartyForm__privacySelection_radioButton__public">
                <Radio
                  checked={genre === "Adventure"}
                  onChange={handleGenrePreference}
                  value="Adventure"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Adventure</span>
              </div>
              <div className="createPartyForm__privacySelection_radioButton__public">
                {" "}
                <Radio
                  checked={genre === "Comedy"}
                  onChange={handleGenrePreference}
                  value="Comedy"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Comedy</span>
              </div>
              <div className="createPartyForm__privacySelection_radioButton__public">
                <Radio
                  checked={genre === "Crime"}
                  onChange={handleGenrePreference}
                  value="Crime"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Crime</span>
              </div>
              <div className="createPartyForm__privacySelection_radioButton__public">
                <Radio
                  checked={genre === "Drama"}
                  onChange={handleGenrePreference}
                  value="Drama"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Drama</span>
              </div>
            </div>
            <div className="createPartyForm__genreSelections__content">
              {" "}
              <div className="createPartyForm__privacySelection_radioButton__public">
                {" "}
                <Radio
                  checked={genre === "Horror"}
                  onChange={handleGenrePreference}
                  value="Horror"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Horror</span>
              </div>
              <div className="createPartyForm__privacySelection_radioButton__public">
                <Radio
                  checked={genre === "Music"}
                  onChange={handleGenrePreference}
                  value="Music"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Music</span>
              </div>
              <div className="createPartyForm__privacySelection_radioButton__public">
                {" "}
                <Radio
                  checked={genre === "Sci-Fi"}
                  onChange={handleGenrePreference}
                  value="Sci-Fi"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Sci-Fi</span>
              </div>
              <div className="createPartyForm__privacySelection_radioButton__public">
                <Radio
                  checked={genre === "Thriller"}
                  onChange={handleGenrePreference}
                  value="Thriller"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Thriller</span>
              </div>
            </div>
          </div>
        </div>
        <div className="createPartyForm__privacySelection">
          <div className="createPartyForm__privacySelection__question">
            <h3>My party should be in :</h3>
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
        <div
          className={`createPartyForm__actionButton ${
            videoUrl === "" && "disabled"
          }`}
        >
          <button disabled={videoUrl === ""} onClick={handleCreateParty}>
            Create Theatre
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { createLiveShow })(CreatePartyForm);
