import React, { useState, useEffect, useRef } from "react";
import "./stylesheets/Room.css";
import ReactPlayer from "react-player";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { useSocket } from "../contexts/SocketProvider";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ScrollToBottom from "react-scroll-to-bottom";
import PlayerControls from "../components/PlayerControls";
import screenfull from "screenfull";
import format from "../util/playerDurationFormat";
let count = 0;
function Room({ userName }) {
  const [playerState, setPlayerState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });
  const [hideControls, setHideControls] = useState(false);
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [showRight, setShowRight] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { roomCode } = useParams();
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const playerContainerRef = useRef(null);

  const socket = useSocket();

  const { playing, muted, volume, playbackRate, played, seeking } = playerState;

  //...............................................................................
  useEffect(() => {
    if (socket !== undefined) {
      socket.emit("join-party", { roomCode: roomCode, userName: userName });
      // return () => {
      //   socket.emit("disconnect");
      //   console.log("disconnect");
      // };
    }
    return () => {
      if (socket === undefined) return;
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket]);
  useEffect(() => {
    if (socket !== undefined) {
      socket.on("party-message", (data) => {
        console.log(data);
        setAllMessages((prev) => [...prev, data]);
      });
    }
  }, [socket]);
  const handleOpenRight = () => {
    setShowRight((prev) => !prev);
  };
  const handleSendMessage = () => {
    const chatData = {
      roomCode: roomCode,
      userName: userName,
      message: sendMessage,
    };
    if (socket === undefined || sendMessage === "") return;

    socket.emit("send-party-message", chatData);
    console.log(allMessages);
    setSendMessage("");
  };
  //......................................................................................
  const handleMouseMove = () => {
    setHideControls(false);
    count = 0;
  };
  const handlePlayPause = () => {
    setPlayerState({ ...playerState, playing: !playerState.playing });
  };
  const handleMute = () => {
    setPlayerState({ ...playerState, muted: !playerState.muted });
  };
  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };
  const handleProgress = (changeState) => {
    if (count > 2) {
      setHideControls(true);
      count = 0;
    }
    if (!hideControls) {
      count++;
    }
    setPlayerState({ ...playerState, ...changeState });
  };
  const handleSeekChange = (e) => {
    setPlayerState({
      ...playerState,
      played: parseFloat(e.target.value / 100),
    });
  };
  const handleVolumeChange = (e) => {
    setPlayerState({
      ...playerState,
      volume: parseFloat(e.target.value / 100),
      muted: e.target.value === 0 ? true : false,
    });
  };
  const handleVolumeSeekUp = (e) => {
    setPlayerState({
      ...playerState,
      volume: parseFloat(e.target.value / 100),
      muted: e.target.value === 0 ? true : false,
    });
  };
  const handleSeekMouseDown = (e) => {
    setPlayerState({ ...playerState, seeking: true });
  };
  const handleSeekMouseUp = (e) => {
    setPlayerState({ ...playerState, seeking: false });
    playerRef.current.seekTo(e.target.value / 100);
  };
  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);
  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="room"
      ref={playerContainerRef}
    >
      <div className="room__videoContent">
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=XZDA2XrwenY"
          className="player"
          width={showRight ? "100%" : "85%"}
          height="100%"
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          loop
          playing={playing}
          onProgress={handleProgress}
        />
      </div>
      <div className="room__player-skin">
        <div
          className={`room__player__left ${
            hideControls ? "hideControls" : ""
          } ${showRight ? "expand" : ""}`}
        >
          <PlayerControls
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            // onRewind={handleRewind}
            // onFastForward={handleFastForward}
            muted={muted}
            onMute={handleMute}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekUp={handleVolumeSeekUp}
            volume={volume}
            playbackRate={playbackRate}
            // onPlaybackRate={handlePlaybackRateChange}
            onToggleFullscreen={toggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elaspedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleChangeDisplayFormat}
            // onBookmark={addBookmark}
          />
        </div>
        <div className={`room__player__right ${showRight ? "hide" : ""}`}>
          <div
            className={`room__player__right__toggleOpenCloseRight ${
              hideControls ? "hideControls" : ""
            }`}
          >
            <IconButton onClick={handleOpenRight}>
              {!showRight ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
            </IconButton>
          </div>

          <ScrollToBottom className="room__player__right__content">
            {" "}
            {/* <div className="room__player__right__contentu"> */}{" "}
            {allMessages.map((message) =>
              message.type === "greet" ? (
                <p className="sentText pr-10 greet">{message.text}</p>
              ) : message.user === userName ? (
                <div className="messageContainer justifyEnd">
                  <div className="messageBox backgroundBlue mine">
                    <p className="messageText colorWhite">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="messageContainer justifyStart">
                  {/* <Avatar src={chatMessage.sender.profileImageUrl}></Avatar> */}
                  <div className="messageBox backgroundLight other">
                    <p className="messageText colorDark">{message.text}</p>
                  </div>
                  {/* <p className="sentText pl-10 ">usersaddasd</p> */}
                </div>
              )
            )}{" "}
            {/* </div>{" "} */}
          </ScrollToBottom>

          <div className="room__player__right__chat__input">
            <input
              onKeyPress={(event) =>
                event.key === "Enter" ? handleSendMessage() : null
              }
              onChange={(e) => setSendMessage(e.target.value)}
              type="text"
              value={sendMessage}
              placeholder="type message ..."
            ></input>
            <IconButton onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
  };
};

export default connect(mapStateToProps)(Room);
