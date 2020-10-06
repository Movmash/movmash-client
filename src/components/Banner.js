import React, { useState } from "react";
import "./stylesheets/Banner.css";
import ReactPlayer from "react-player";
//................................
import Dialog from "@material-ui/core/Dialog";
import { useHistory } from "react-router-dom";

function Banner({ id, imageUrl, videoSrc }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  // if (upcomingMovies.length !== 0) {
  //   random = Math.floor(Math.random() * 5);
  // }
  // console.log(random);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                    ${imageUrl}
                )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <div className="banner__buttons">
          <button onClick={handleClickOpen} className="banner__button">
            Watch Trailer
          </button>
          <button
            onClick={() => {
              history.push(`/movie/${id}`);
            }}
            className="banner__button"
          >
            Review
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>

      <Dialog
        className="banner__dialog"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="banner__dialogContent">
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              controls={true}
              url={videoSrc}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Banner;
