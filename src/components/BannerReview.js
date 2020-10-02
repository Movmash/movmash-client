import React, { useState } from "react";
import "./stylesheets/BannerReview.css";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Dialog from "@material-ui/core/Dialog";
import { IconButton } from "@material-ui/core";
function BannerReview({ imageUrl, videoSrc }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className="bannerReview"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
                    ${imageUrl}
                )`,
          backgroundPosition: "center center",
        }}
      >
        <div className="bannerReview__contents">
          <div className="bannerReview__buttons">
            <IconButton onClick={handleClickOpen}>
              <PlayArrowIcon />
            </IconButton>
          </div>
        </div>
        <div className="bannerReview--fadeBottom"></div>
        <Dialog
          className="bannerReview__dialog"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div className="bannerReview__dialogContent">
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
    </>
  );
}

export default BannerReview;
