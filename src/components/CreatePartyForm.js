import React, { useState } from "react";
import "./stylesheets/CreatePartyForm.css";
import TextField from "@material-ui/core/TextField";
import { Radio, Button } from "@material-ui/core";
import axios from "axios";
function CreatePartyForm({ closeCreateTheatrDialog }) {
  const [privacy, setPrivacy] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePrivacyPreference = (e) => {
    setPrivacy(e.target.value);
  };
  const handleCreateParty = () => {
    const roomDetail = {
      roomTitle: roomTitle,
      description: description,
      privacy: privacy,
      videoUrl: videoUrl,
      roomCode: "asdasdsa",
    };
    // console.log(roomDetail);
    axios
      .post("http://localhost:8000/api/v1/live/create-live-show", roomDetail)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="createPartyForm">
      <div className="createPartyForm__container">
        {" "}
        <div className="createPartyForm__roomTitle">
          {/* <div className="createPartyForm__roomTitle__title">
          <span>Room Title</span>
        </div> */}
          <div className="createPartyForm__roomTitle__input">
            <TextField
              id="outlined-full-width"
              label="Room Title"
              onChange={(e) => setRoomTitle(e.target.value)}
              // style={{ margin: 30 }}
              placeholder="Horror Night"
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
              // style={{ margin: 30 }}
              placeholder="let's hangout together !!"
              // helperText="Full width!"
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
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
        <div className="createPartyForm__contentSelection">
          <div className="createPartyForm__contentSelection__question">
            <h3>What you wanna host : </h3>
          </div>
          <div className="createPartyForm__contentSelection__urlInput">
            <TextField
              id="outlined-full-width"
              label="video url"
              // style={{ margin: 30 }}
              placeholder="e.g: https://www.youtube.com/watch?v=o2-wA-N04PA"
              // helperText="Full width!"
              onChange={(e) => setVideoUrl(e.target.value)}
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
        <div className="createPartyForm__actionButtons">
          <div className="createPartyForm__actionButton">
            <Button
              onClick={closeCreateTheatrDialog}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
          <div className="createPartyForm__actionButton">
            <Button
              onClick={handleCreateParty}
              // disabled={ratingPreference === 0 ? true : false}
              variant="contained"
              color="primary"
            >
              Create Theatre
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePartyForm;
