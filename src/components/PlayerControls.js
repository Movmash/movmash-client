import React from "react";
import "./stylesheets/PlayerControls.css";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import SyncIcon from "@material-ui/icons/Sync";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { IconButton } from "@material-ui/core";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
function PlayerControls({
  onPlayPause, //
  playing, //
  onFastForward,
  onRewind,
  onMute, //
  muted, //
  onVolumeChange,
  onVolumeSeekUp,
  volume, //
  onPlaybackRate,
  playbackRate, //
  onToggleFullscreen, //
  played, //
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  elaspedTime, //
  totalDuration, //
  onChangeDisplayFormat,
  onBookmark,
  syncVideo,
  isFullScreen,
  host,
  isProgress,
}) {
  return (
    <div className="playerControls">
      {" "}
      <Link to="/live">
        <div className="playerControls__topControls medium">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
      </Link>
      <div
        className={`playerControls__middleControls large ${
          !host && "disableControl"
        }`}
      >
        {isProgress ? (
          <MoonLoader color={"white"} size={"60px"} />
        ) : playing ? (
            <IconButton onClick={onPlayPause}>
              <PauseIcon />
            </IconButton>
        ) : (
            <IconButton onClick={onPlayPause}>
              <PlayArrowIcon />
            </IconButton>
        )}
      </div>
      <div className="playerControls__bottomControls">
        <div
          className={`playerControls__bottomControls__seeker ${
            !host && "disableControl"
          }`}
        >
          <input
            type="range"
            min={0}
            max={1000}
            //   defaultValue={sliderValue}
            className="player-slider"
            value={played * 1000}
            onChange={(e) => {
              // setSliderValue(e.target.value);
              onSeek(e);
            }}
            onMouseDown={onSeekMouseDown}
            onChangeCapture={onSeekMouseUp}
            style={{
              background: `linear-gradient(90deg, #499E4C ${
                played * 100
              }%, lightgray ${played * 100}%)`,
            }}
          />
        </div>
        <div className="playerControls__bottomControls__mainControls">
          <div className="playerControls__bottomControls__mainControls__leftControls mediumSmall">
            <IconButton
              style={{ pointerEvents: !host && "none" }}
              onClick={() => {
                if (host) {
                  onPlayPause();
                }
              }}
            >
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
              {/* {} */}
            </IconButton>

            <span onClick={onChangeDisplayFormat}>
              {elaspedTime}/{totalDuration}
            </span>
            <IconButton onClick={onMute}>
              {muted ? (
                <VolumeOffIcon fontSize="small" />
              ) : (
                <VolumeUpIcon fontSize="small" />
              )}
            </IconButton>
            <div className="playerControls__bottomControls__mainControls__volumeContainer">
              <input
                type="range"
                min={0}
                max={100}
                // defaultValue={100}
                onChange={onVolumeChange}
                onChangeCapture={onVolumeSeekUp}
                value={muted ? 0 : volume * 100}
                className="volume-slider"
                style={{
                  background: `linear-gradient(90deg, white ${
                    volume * 100
                  }%, lightgray ${volume * 100}%)`,
                }}
              />
            </div>
          </div>
          <div className="playerControls__bottomControls__mainControls__rightControls mediumSmall">
            {host && (
              <IconButton
                onClick={() => {
                  syncVideo();
                }}
              >
                <SyncIcon />
              </IconButton>
            )}

            <IconButton onClick={onToggleFullscreen}>
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerControls;
