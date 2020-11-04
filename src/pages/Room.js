import React, { useState, useEffect, useRef, useCallback } from "react";
import "./stylesheets/Room.css";
import ReactPlayer from "react-player/youtube";
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
// import axios from "axios";
let count = 0;
function Room({ userName, userId }) {
  const [host, setHost] = useState(false);
  const [playerState, setPlayerState] = useState({
    playing: false,
    muted: true,
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

  const {
    playing,
    muted,
    volume,
    playbackRate,
    played,
    //  seeking
  } = playerState;

  // useEffect(() => {
  //   axios.get(
  //     `http://localhost:8000/api/v1/live/get-live-show-details/${roomCode}`
  //   ).then(res => {

  //   });
  // })

  //...............................................................................
  useEffect(() => {
    if (socket !== undefined) {
      socket.emit(
        "join-party",
        { roomCode: roomCode, userName: userName, userId }
        // (data) => {
        //   if (data) {
        //     console.log("Host is syncing the new socket! ");
        //     syncVideo(roomCode);
        //   }
        // }
      );
      // return () => {
      //   socket.emit("disconnect");
      //   console.log("disconnect");
      // };
      //  socket.emit("new-room", roomCode, (data) => {

      //  });
    }
    return () => {
      if (socket === undefined) return;
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket, roomCode, userName, userId]);
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
    console.log("play or pause");
    if (!playing) {
      setPlayerState((prev) => {
        return {
          ...prev,
          playing: true,
        };
      });
      // setPlayerState({ ...playerState, playing: true });
      if (host) {
        playOther(roomCode);
      } else {
        getHostData(roomCode);
      }
    } else {
      setPlayerState((prev) => {
        return {
          ...prev,
          playing: false,
        };
      });
      // setPlayerState({ ...playerState, playing: false });
      if (host) {
        pauseOther(roomCode);
      }
    }
  };
  const handleMute = () => {
    // setPlayerState({ ...playerState, muted: !playerState.muted });
    setPlayerState((prev) => {
      return {
        ...prev,
        muted: !prev.muted,
      };
    });
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
    setPlayerState((prev) => {
      return {
        ...prev,
        ...changeState,
      };
    });
    // setPlayerState({ ...playerState, ...changeState });
  };
  const handleSeekChange = (e) => {
    // playerRef.current.seekTo(e.target.value / 1000);
    // console.log("seek change");
    // console.log(playerRef.current.getCurrentTime());
    // console.log(parseFloat(e.target.value / 100));
    // let currTime = playerRef.current.getCurrentTime();
    // if (host) {
    // seekOther(roomCode, currTime);
    // }
    // console.log(parseFloat(e.target.value / 1000));
    // setPlayerState((prev) => {
    //   return {
    //     ...prev,
    //     played: parseFloat(e.target.value / 1000),
    //   };
    // });
    setPlayerState({
      ...playerState,
      played: parseFloat(e.target.value / 1000),
    });
  };
  const handleVolumeChange = (e) => {
    // setPlayerState((prev) => {
    //   return {
    //     ...prev,
    //     volume: parseFloat(e.target.value / 100),
    //     muted: e.target.value === 0 ? true : false,
    //   };
    // });
    setPlayerState({
      ...playerState,
      volume: parseFloat(e.target.value / 100),
      muted: e.target.value === 0 ? true : false,
    });
  };
  const handleVolumeSeekUp = (e) => {
    // setPlayerState((prev) => {
    //   return {
    //     ...prev,
    //     volume: parseFloat(e.target.value / 100),
    //     muted: e.target.value === 0 ? true : false,
    //   };
    // });
    setPlayerState({
      ...playerState,
      volume: parseFloat(e.target.value / 100),
      muted: e.target.value === 0 ? true : false,
    });
  };
  const handleSeekMouseDown = (e) => {
    setPlayerState((prev) => {
      return {
        ...prev,
        seeking: true,
      };
    });
    // setPlayerState({ ...playerState, seeking: true });
  };
  const handleSeekMouseUp = (e) => {
    console.log(e.target.value / 1000);
    setPlayerState((prev) => {
      return {
        ...prev,
        seeking: false,
      };
    });
    // setPlayerState({ ...playerState, seeking: false });
    playerRef.current.seekTo(e.target.value / 1000);
    // let currTime = playerRef.current.getCurrentTime();
    let currTime = e.target.value / 1000;
    if (host) {
      seekOther(roomCode, currTime);
    }
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

  //.............................................. sync........
  // const syncVideo = (roomCode) => {
  //   let currTime = 0;
  //   currTime =
  //     playerRef.current.getCurrentTime() / playerRef.current.getDuration();
  //   if (socket !== undefined) {
  //     socket.emit("sync-video", {
  //       roomCode: roomCode,
  //       time: currTime,
  //       state: playing,
  //     });
  //   }
  // };
  const syncVideo = useCallback(
    (roomCode) => {
      let currTime = 0;
      currTime =
        playerRef.current.getCurrentTime() / playerRef.current.getDuration();
      if (socket !== undefined) {
        socket.emit("sync-video", {
          roomCode: roomCode,
          time: currTime,
          state: playing,
        });
      }
    },
    [playing, socket]
  );
  // const syncVideoAtjoin = (roomCode) => {
  //   currTime = playerRef.current.get
  // }

  useEffect(() => {
    if (socket !== undefined) {
      socket.emit("new-room", roomCode, (data) => {
        if (data) {
          console.log("Host is syncing the new socket! ");
          syncVideo(roomCode);
        }
      });
    }
  }, [socket, roomCode, syncVideo]);

  // const playVideo = (roomCode) => {
  //   // console.log(media.paused);
  //   socket.emit("play-video", {
  //     room: roomCode,
  //   });
  // };
  const getHostData = (roomCode) => {
    console.log("host data");
    socket.emit("get-host-data", {
      room: roomCode,
    });
  };
  // const play = () => {
  //   if (playing) {
  //     setPlayerState({ ...playerState, playing: false });
  //   } else {
  //     setPlayerState({ ...playerState, playing: true });
  //   }
  // };

  const play = useCallback(() => {
    if (playing) {
      // setPlayerState({ ...playerState, playing: false });
      setPlayerState((prev) => {
        return {
          ...prev,
          playing: false,
        };
      });
    } else {
      // setPlayerState({ ...playerState, playing: true });
      setPlayerState((prev) => {
        return {
          ...prev,
          playing: true,
        };
      });
    }
  }, [playing]);
  const playOther = (roomCode) => {
    if (socket !== undefined) {
      socket.emit("play-other", {
        roomCode: roomCode,
      });
    }
  };

  const pauseOther = (roomCode) => {
    if (socket !== undefined) {
      socket.emit("pause-other", {
        roomCode: roomCode,
      });
    }
  };

  const seekOther = (roomCode, currTime) => {
    if (socket !== undefined) {
      socket.emit("seek-other", {
        roomCode: roomCode,
        time: currTime,
      });
    }
  };

  // const getTime = () => {
  //   return playerRef.current.getCurrentTime();
  // };
  // const seekTo = (time) => {
  //   playerRef.current.seekTo(time);
  // };

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("play-video-client", (data) => {
        play();
      });
    }
  }, [socket, play]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("pause-video-client", (data) => {
        // setPlayerState({ ...playerState, playing: false });
        setPlayerState((prev) => {
          return {
            ...prev,
            playing: false,
          };
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("sync-video-client", (data) => {
        let currTime = data.time;
        let state = data.state;
        console.log(`current time is: ${currTime}`);
        console.log(`state ${state}`);
        playerRef.current.seekTo(currTime);
        // setPlayerState((prev) => {
        //   return {
        //     ...prev,
        //     playing: state,
        //   };
        // });
        if (state) {
          setPlayerState({
            ...playerState,
            playing: true,
          });
        } else {
          setPlayerState({
            ...playerState,
            playing: false,
          });
        }
      });
    }
  }, [socket, playerState]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("just-play", (data) => {
        if (!playing) {
          // setPlayerState({ ...playerState, playing: true });
          setPlayerState((prev) => {
            return {
              ...prev,
              playing: true,
            };
          });
        }
      });
    }
  }, [socket, playing]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("just-pause", (data) => {
        // setPlayerState({ ...playerState, playing: false });
        setPlayerState((prev) => {
          return {
            ...prev,
            playing: false,
          };
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("just-seek", (data) => {
        console.log("heyyyyyy");
        let clientTime =
          playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        let currTime = data.time;
        console.log(clientTime, currTime);
        playerRef.current.seekTo(currTime);
        // if (clientTime < currTime - 2 || clientTime > currTime + 2) {

        // }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("set-host", () => {
        setHost(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket !== undefined) {
      console.log("gte-data");
      // if (host) {
      socket.on("get-data", (data) => {
        console.log("hi im the host , you called ?");
        // socket.emit("sync-host", { roomCode: roomCode });
        //.....
        let currTime =
          playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        let state;
        setPlayerState((prev) => {
          state = prev.playing;
          return {
            ...prev,
          };
        });
        socket.emit("sync-the-host", {
          caller: data.caller,
          // roomCode: roomCode,
          state: state,
          time: currTime,
        });
      });
      // }
    }
  }, [socket]);

  const syncHostThroughButton = () => {
    if (socket !== undefined) {
      let currTime =
        playerRef.current.getCurrentTime() / playerRef.current.getDuration();
      socket.emit("sync-the-host-button", {
        roomCode: roomCode,
        state: playing,
        time: currTime,
      });
    }
  };

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("sync-host-server", (data) => {
        console.log("sync-host-server");
        syncVideo(roomCode);
      });
    }
  }, [socket, syncVideo, roomCode]);
  //.......................................
  useEffect(() => {
    if (socket !== undefined) {
      socket.on("sync-the-video-with-host", (data) => {
        let currTime = data.time;
        let state = data.state;
        console.log("current time is: " + " " + currTime);
        console.log("state" + state);
        playerRef.current.seekTo(currTime);
        // setPlayerState((prev) => {
        //   return {
        //     ...prev,
        //     playing: state,
        //   };
        // });
        if (state) {
          setPlayerState((prev) => {
            return {
              ...prev,
              playing: true,
            };
          });
        } else {
          setPlayerState((prev) => {
            return {
              ...prev,
              playing: false,
            };
          });
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("sync-the-video-with-host-button", (data) => {
        let currTime = data.time;
        let state = data.state;
        console.log("current time is: " + " " + currTime);
        console.log("state" + state);
        playerRef.current.seekTo(currTime);
        // setPlayerState((prev) => {
        //   return {
        //     ...prev,
        //     playing: state,
        //   };
        // });
        if (state) {
          setPlayerState((prev) => {
            return {
              ...prev,
              playing: true,
            };
          });
        } else {
          setPlayerState((prev) => {
            return {
              ...prev,
              playing: false,
            };
          });
        }
      });
    }
  }, [socket]);
  //........................
  useEffect(() => {
    if (socket !== undefined) {
      socket.on("get-player-data", (data) => {
        let roomCode = data.room;
        let caller = data.caller;

        let currTime =
          playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        let state = playing;
        socket.emit("get-host-data", {
          room: roomCode,
          currTime: currTime,
          state: state,
          caller: caller,
        });
      });
    }
  }, [socket, playing]);

  // const disconnected = () => {
  //   console.log("disconnected");
  // };

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("compareHost", (data) => {
        var hostTime = data.currTime;
        // var hostState = data.state;
        var currTime =
          playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        // var state = playing;
        console.log("curr: " + currTime + " Host: " + hostTime);
        playerRef.current.seekTo(hostTime);
        // if (currTime < hostTime - 2 || currTime > hostTime + 2) {
        //   disconnected();
        // }
      });
    }
  }, [socket]);

  // const changeHost = (roomCode) => {
  //   if (!host) {
  //     socket.emit("change host", {
  //       room: roomCode,
  //     });
  //   }
  // };

  const changeHost = useCallback(
    (roomCode) => {
      if (!host) {
        socket.emit("change host", {
          room: roomCode,
        });
      }
    },
    [host, socket]
  );

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("autoHost", (data) => {
        changeHost(data.roomCode);
      });
    }
  }, [socket, changeHost]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="room"
      ref={playerContainerRef}
    >
      <div className="room__videoContent">
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=vuQR6Mj64jQ"
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
            syncVideo={syncHostThroughButton}
            host={host}
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
            {allMessages.map((message, index) =>
              message.type === "greet" ? (
                <p key={index} className="sentText pr-10 greet">
                  {message.text}
                </p>
              ) : message.user === userName ? (
                <div key={index} className="messageContainer justifyEnd">
                  <div className="messageBox backgroundBlue mine">
                    <p className="messageText colorWhite">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div key={index} className="messageContainer justifyStart">
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
    userId: state.user._id,
  };
};

export default connect(mapStateToProps)(Room);
