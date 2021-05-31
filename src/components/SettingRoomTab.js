import { Radio } from "@material-ui/core";
import React, { useState } from "react";
import {connect} from "react-redux";
import "./stylesheets/settingRoomTab.css";
import ReactPlayer from "react-player";
import {useSocket} from "../contexts/SocketProvider";
function SettingRoomTab({ liveShowDetail, userId }) {
  const {
    videoUrl,
    genre,
    privacy,
    roomTitle,
    host,
    description,
    _id,
    roomCode,
  } = liveShowDetail;
  const [newVideoSrc, setNewVideoSrc] = useState(videoUrl);
  const [newGenre, setNewGenre] = useState(genre);
  const [newPrivacy, setNewPrivacy] = useState(privacy);
  const [newRoomTitle, setRoomTitle] = useState(roomTitle);
  const [roomDescription, setRoomDescription] = useState(description);
  const [canVideoPlay, setCanVideoPlay] = useState(
    ReactPlayer.canPlay(videoUrl)
  );
  const socket = useSocket();
  const handlePrivacyPreference = (e) => {
    setNewPrivacy(e.target.value);
  };
  const handleGenrePreference = (e) => {
    setNewGenre(e.target.value);
  };
  const handleChangeVideoUrl = () => {
    const roomChangeData = {
      liveShowId: _id,
      roomCode: roomCode,
      videoUrl: newVideoSrc,
    };
    socket.emit("change-room-video-source", roomChangeData);
  };

  const handleChangeRoomInfo = () => {
    const roomChangeData = {
      genre: newGenre,
      privacy: newPrivacy,
      roomTitle: newRoomTitle,
      description: roomDescription,
      liveShowId: _id,
      roomCode: roomCode,
    };
    socket.emit("change-room-info", roomChangeData);
  };
  const isHost = host === userId;
  return (
    <div className="settingRoomTab">
      <div className="settingRoomTab__changeVideoSrc">
        <span>Video source</span>
        <input
          type="text"
          value={isHost ? newVideoSrc : videoUrl}
          readOnly={!isHost}
          onChange={(e) => {
            setCanVideoPlay(ReactPlayer.canPlay(e.target.value));
            setNewVideoSrc(e.target.value);
          }}
        />
        {isHost && (
          <div
            className={`settingRoomTab__button ${
              (!canVideoPlay || newVideoSrc === videoUrl) && "disabled"
            }`}
          >
            <button
              disabled={!canVideoPlay || newVideoSrc === videoUrl}
              onClick={handleChangeVideoUrl}
            >
              Change video
            </button>
          </div>
        )}
      </div>
      <div className="settingRoomTab__roomInfo__shareLink">
        <div className="settingRoomTab__roomInfo__content">
          <div className="settingRoomTab__roomInfo__infoSlab">
            <span>Room link</span>
            <input
              id="settingLink"
              type="text"
              readOnly
              value={window.location.href}
            />
          </div>
          <div className={`settingRoomTab__button`}>
            <button
              onClick={() => {
                var copyText = document.getElementById("settingLink");
                copyText.select();
                copyText.setSelectionRange(0, 99999);
                document.execCommand("copy");
              }}
            >
              Share link
            </button>
          </div>
        </div>
      </div>
      <div className="settingRoomTab__roomInfo">
        <div className="settingRoomTab__roomInfo__heading">
          <span>Room details</span>
        </div>
        <div className="settingRoomTab__roomInfo__content">
          <div className="settingRoomTab__roomInfo__infoSlab">
            <span>Title</span>
            <input
              type="text"
              readOnly={!isHost}
              placeholder="No title"
              value={isHost ? newRoomTitle : roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
            />
          </div>
          <div className="settingRoomTab__roomInfo__infoSlab">
            <span>Description</span>
            <textarea
              type="text"
              placeholder="No title"
              readOnly={!isHost}
              value={isHost ? roomDescription : description}
              onChange={(e) => setRoomDescription(e.target.value)}
            />
          </div>
          {isHost ? (
            <div className="settingRoomTab__roomInfo__infoSlab">
              <span>Genre</span>
              <div className="createPartyForm__genreSelections__contents">
                {" "}
                <div className="createPartyForm__genreSelections__content">
                  {" "}
                  <div className="createPartyForm__privacySelection_radioButton__public">
                    {" "}
                    <Radio
                      checked={newGenre === "Action"}
                      onChange={handleGenrePreference}
                      value="Action"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <span>Action</span>
                  </div>
                  <div className="createPartyForm__privacySelection_radioButton__public">
                    <Radio
                      checked={newGenre === "Adventure"}
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
                      checked={newGenre === "Comedy"}
                      onChange={handleGenrePreference}
                      value="Comedy"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <span>Comedy</span>
                  </div>
                  <div className="createPartyForm__privacySelection_radioButton__public">
                    <Radio
                      checked={newGenre === "Crime"}
                      onChange={handleGenrePreference}
                      value="Crime"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <span>Crime</span>
                  </div>
                  <div className="createPartyForm__privacySelection_radioButton__public">
                    <Radio
                      checked={newGenre === "Drama"}
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
                      checked={newGenre === "Horror"}
                      onChange={handleGenrePreference}
                      value="Horror"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <span>Horror</span>
                  </div>
                  <div className="createPartyForm__privacySelection_radioButton__public">
                    <Radio
                      checked={newGenre === "Music"}
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
                      checked={newGenre === "Sci-Fi"}
                      onChange={handleGenrePreference}
                      value="Sci-Fi"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <span>Sci-Fi</span>
                  </div>
                  <div className="createPartyForm__privacySelection_radioButton__public">
                    <Radio
                      checked={newGenre === "Thriller"}
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
          ) : (
            <div className="settingRoomTab__roomInfo__infoSlab">
              <span>Genre</span>
              <input
                type="text"
                readOnly={!isHost}
                value={genre === "" ? "No genre" : genre}
              />
            </div>
          )}
          {isHost ? (
            <div className="settingRoomTab__roomInfo__infoSlab">
              <span>Privacy</span>
              <div className="createPartyForm__privacySelection_radioButton">
                <div className="createPartyForm__privacySelection_radioButton__public">
                  {" "}
                  <Radio
                    checked={newPrivacy === "Public"}
                    onChange={handlePrivacyPreference}
                    value="Public"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <span>Public</span>
                </div>
                <div className="createPartyForm__privacySelection_radioButton__public">
                  <Radio
                    checked={newPrivacy === "Private"}
                    onChange={handlePrivacyPreference}
                    value="Private"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <span>Private</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="settingRoomTab__roomInfo__infoSlab">
              <span>Privacy</span>
              <input type="text" readOnly={!isHost} value={privacy} />
            </div>
          )}
        </div>
        {isHost && (
          <div
            className={`settingRoomTab__button ${
              genre === newGenre &&
              privacy === newPrivacy &&
              roomTitle === newRoomTitle &&
              description === roomDescription &&
              "disabled"
            }`}
          >
            <button
              disabled={
                genre === newGenre &&
                privacy === newPrivacy &&
                roomTitle === newRoomTitle &&
                description === roomDescription
              }
              onClick={handleChangeRoomInfo}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    liveShowDetail: state.liveShow.liveShowDetail,
    userId: state.user._id
  }
}
export default connect(mapStateToProps)(SettingRoomTab);
