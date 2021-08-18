import React, { useState, useEffect, useRef, useCallback } from "react";
import "./stylesheets/Room.css";
import ReactPlayer from "react-player";
import SendIcon from "@material-ui/icons/Send";
import { Avatar, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { useSocket } from "../contexts/SocketProvider";
import { useParams, useHistory, Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ScrollToBottom from "react-scroll-to-bottom";
import PlayerControls from "../components/PlayerControls";
import screenfull from "screenfull";
import format from "../util/playerDurationFormat";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { getLiveShowDetail } from "../redux/actions/liveShowAction";
import ErrorIcon from "@material-ui/icons/Error";
import NoMeetingRoomIcon from "@material-ui/icons/NoMeetingRoom";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleRoomTab from "../components/PeopleRoomTab";
import SettingRoomTab from "../components/SettingRoomTab";
import {Dialog} from "@material-ui/core";
import FriendListMessage from "../components/FriendListMessage";
import InfoIcon from "@material-ui/icons/Info";
import {
  updateVideoUrl,
  updateLiveShowInfo,
} from "../redux/actions/liveShowAction";
// import Peer from "simple-peer";
// import axios from "axios";
let count = 0;

function Room({
  userName,
  userId,
  fullName,
  liveShowDetail,
  getLiveShowDetail,
  authenticated,
  authLoading,
  profileImageUrl,
  updateVideoUrl,
  updateLiveShowInfo,
}) {
  const [openInviteFriendsDialog, setOpenInviteFriendsDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("chat");
  const [host, setHost] = useState(false);
  const [isRoomFound, setIsRoomFound] = useState(true);
  const [playerState, setPlayerState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    isFullScreen: false,
  });
  // const [isVideoValid, setVideoValid] = useState(

  // );
  const [watchTime, setWatchTime] = useState(0);
  const [isProgress, setProgress] = useState(true);
  const [isHostAvailble, setIsHostAvailable] = useState(true);
  const [hideControls, setHideControls] = useState(false);
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [showRight, setShowRight] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { roomCode } = useParams();
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const history = useHistory();
  const socket = useSocket();
  //.................
  // const [videoStream, setVideoStream] = useState({});
  // const [peers, setPeers] = useState([]);
  // const userVideo = useRef();
  // const peersRef = useRef([]);
  // const [startVideoChat, setStartVideoChat] = useState(false);
  // useEffect(() => {
  //   return () => {
  //     console.log(videoStream);
  //     if (!videoStream) {
  //       videoStream.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, [videoStream]);
  // const handleVideoChat = useCallback(() => {
  //   if (socket === undefined) return;
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setStartVideoChat(true);
  //       userVideo.current.srcObject = stream;
  //       setVideoStream(stream);
  //       socket.emit("join room", roomCode);
  //       socket.on("all users", (users) => {
  //         console.log(users);
  //         const peers = [];
  //         users.forEach((userID) => {
  //           // let userID = user.id;
  //           const peer = createPeer(userID, socket.id, stream);
  //           peersRef.current.push({
  //             peerID: userID,
  //             peer,
  //           });
  //           peers.push({ id: userID, peer });
  //         });
  //         setPeers(peers);
  //       });
  //       socket.on("close-peer", () => {
  //         const peer = new Peer({
  //           initiator: true,
  //           trickle: false,
  //           stream,
  //         });
  //         // stream.getTracks().forEach((track) => track.stop());
  //         console.log("closePeer");
  //         peer.removeAllListeners();

  //         peer.destroy();
  //       });
  //       socket.on("user joined", (payload) => {
  //         const peer = addPeer(payload.signal, payload.callerID, stream);
  //         peersRef.current.push({
  //           peerID: payload.callerID,
  //           peer,
  //         });

  //         setPeers((users) => [...users, { id: payload.callerID, peer }]);
  //       });

  //       socket.on("receiving returned signal", (payload) => {
  //         const item = peersRef.current.find((p) => p.peerID === payload.id);
  //         item.peer.signal(payload.signal);
  //       });
  //     });
  //   return () => {
  //     const peer = new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream: videoStream,
  //     });
  //     videoStream.getTracks().forEach((track) => track.stop());
  //     console.log("closePeer");
  //     peer.removeAllListeners();

  //     peer.destroy();
  //   };
  // }, [socket, selectedTab]);
  // function createPeer(userToSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socket.emit("sending signal", {
  //       userToSignal,
  //       callerID,
  //       signal,
  //     });
  //   });

  //   return peer;
  // }

  // function addPeer(incomingSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socket.emit("returning signal", { signal, callerID });
  //   });

  //   peer.signal(incomingSignal);

  //   return peer;
  // }
  const {
    playing,
    muted,
    volume,
    playbackRate,
    played,
    isFullScreen,
    //  seeking
  } = playerState;

  useEffect(() => {
    document.body.style.overflowY = "auto";
    if (!authLoading) {
      if (authenticated) {
        if (Object.keys(liveShowDetail).length === 0 && isRoomFound) {
          // if (isRoomFound) {
          getLiveShowDetail(roomCode, history);
          // }
        }

        // console.log("1");
      } else {
        history.push("/login");
      }
    }
  }, [
    getLiveShowDetail,
    liveShowDetail,
    isRoomFound,
    roomCode,
    history,
    authenticated,
    authLoading,
  ]);
  //...............................................................................

  //.........................
  useEffect(() => {
    if (socket !== undefined) {
      socket.emit(
        "join-party",
        {
          roomCode,
          userName,
          userId,
          fullName,
          profileImageUrl,
        }
        // (data) => {
        //   if (data) {
        //     console.log("Host is syncing the new socket! ");
        //     syncVideo(roomCode);
        //   }
        // }
      );
    }
    return () => {
      if (socket === undefined) return;

      // socket.emit("disconnect");

      socket.emit("leaving-party");
      socket.off();
    };
  }, [socket, roomCode, userName, userId, fullName, profileImageUrl]);
  useEffect(() => {
    if (socket !== undefined) {
      // console.log(ReactPlayer.canPlay(liveShowDetail.videoUrl));

      socket.on("party-message", (data) => {
        // console.log(data);
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
      fullName: fullName,
      profileImageUrl: profileImageUrl,
    };
    if (socket === undefined || sendMessage === "") return;

    socket.emit("send-party-message", chatData);
    // console.log(allMessages);
    setSendMessage("");
  };
  //......................................................................................
  const handleMouseMove = () => {
    setHideControls(false);
    count = 0;
  };
  const handlePlayPause = () => {
    // console.log("play or pause");
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
    setPlayerState((prev) => {
      return {
        ...prev,
        isFullScreen: !prev.isFullScreen,
      };
    });
  };
  const handleProgress = (changeState) => {
    setWatchTime((prev) => ++prev);
    socket.emit("update-watch-second", {watchSecond: watchTime});
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
  const handleOnStart = (e) => {
    // console.log("start");
    setProgress(false);
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
    // console.log(e.target.value / 1000);
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
          // console.log("Host is syncing the new socket! ");
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
    // console.log("host data");
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
        // console.log(`current time is: ${currTime}`);
        // console.log(`state ${state}`);
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
        // console.log("heyyyyyy");
        // let clientTime =
        //   playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        let currTime = data.time;
        // console.log(clientTime, currTime);
        playerRef.current.seekTo(currTime);
        // if (clientTime < currTime - 2 || clientTime > currTime + 2) {

        // }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("set-host", () => {
        setHost(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket !== undefined) {
      // console.log("gte-data");
      // if (host) {
      socket.on("get-data", (data) => {
        // console.log("hi im the host , you called ?");
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
        // console.log("sync-host-server");
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
        // console.log(`current time is: ${currTime}`);
        // console.log(`state ${state}`);
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
        // console.log(`current time is: ${currTime}`);
        // console.log("state" + state);
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
        // var currTime =
        //   playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        // var state = playing;
        // console.log("curr: " + currTime + " Host: " + hostTime);
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

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("host-enter-in-room", (data) => {
        setIsHostAvailable(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("no-host-available", (data) => {
        setIsHostAvailable(false);
        setHideControls(false);
      });
    }
  }, [socket]);
  useEffect(() => {
    if (socket !== undefined) {
      socket.on("room-not-found", () => {
        setIsRoomFound(false);
      });
    }
  });

  //...........................
  useEffect(() => {
    if (socket !== undefined) {
    socket.on("new-room-video-source", (payload) => {
      // console.log(payload);
      updateVideoUrl(payload);
    });
    }
  }, [socket, updateVideoUrl]);  

  useEffect(() => {
    if (socket !== undefined) {
    socket.on("new-room-info", (payload) => {
      // console.log(payload);
      updateLiveShowInfo(payload);
    });
    }
  }, [socket, updateLiveShowInfo]);
  return (
    <div
      onMouseMove={handleMouseMove}
      className="room"
      ref={playerContainerRef}
    >
      {isHostAvailble && (
        <div className="room__videoContent">
          <ReactPlayer
            ref={playerRef}
            url={liveShowDetail.videoUrl}
            className="player"
            width={showRight ? "100%" : "80%"}
            height="100%"
            volume={volume}
            muted={muted}
            playbackRate={playbackRate}
            loop
            // config={{
            //   youtube: {
            //     playerVars: {
            //       mode: "opaque",
            //       showinfo: 0,
            //       modestbranding: 0,
            //       rel: 0,
            //       autohide: 0,
            //       wmode: "transparent",
            //     },
            //   },
            // }}
            playing={playing}
            onProgress={handleProgress}
            onReady={handleOnStart}
            onBuffer={() => setProgress(true)}
            onBufferEnd={() => setProgress(false)}
          />
        </div>
      )}

      <div className="room__player-skin">
        {isHostAvailble &&
        ReactPlayer.canPlay(liveShowDetail.videoUrl) &&
        isRoomFound ? (
          <div
            className={`room__player__left ${
              hideControls ? "hideControls" : ""
            } ${showRight ? "expand" : ""}`}
          >
            <PlayerControls
              // ref={controlsRef}
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
              isFullScreen={isFullScreen}
              isProgress={isProgress}
              // onBookmark={addBookmark}
            />
            <div
              className={`room__player__right__toggleOpenCloseRight ${
                hideControls ? "hideControls" : ""
              }`}
            >
              <IconButton onClick={handleOpenRight}>
                {!showRight ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
              </IconButton>
            </div>
          </div>
        ) : (
          <div
            className={`errorMessage room__player__left ${
              hideControls ? "hideControls" : ""
            } ${showRight ? "expand" : ""}`}
          >
            <div className="hostIsNotAvailable__Content">
              {ReactPlayer.canPlay(liveShowDetail.videoUrl) && isRoomFound ? (
                <>
                  <div className="errorMessage__header">
                    <Link to="/live">
                      <div className="playerControls__topControls medium room_header">
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </Link>
                  </div>
                  <div className="errorMessage__content">
                    <SentimentVeryDissatisfiedIcon />
                    <h2>Host is not available</h2>
                    <p>kindly wait for the host or check another room</p>
                  </div>
                </>
              ) : !isRoomFound ? (
                <>
                  <div className="errorMessage__header">
                    <Link to="/live">
                      <div className="playerControls__topControls medium room_header">
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </Link>
                  </div>
                  <div className="errorMessage__content">
                    <NoMeetingRoomIcon />
                    <h2>Room not found</h2>
                    <p>this room does not exist any more</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="errorMessage__header">
                    <Link to="/live">
                      <div className="playerControls__topControls medium room_header">
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </Link>
                  </div>
                  <div className="errorMessage__content">
                    <ErrorIcon />
                    <h2>Video can't play</h2>
                    <p>make sure the url is valid</p>
                  </div>
                </>
              )}
            </div>
            <div
              className={`room__player__right__toggleOpenCloseRight ${
                hideControls ? "hideControls" : ""
              }`}
            >
              <IconButton onClick={handleOpenRight}>
                {!showRight ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
              </IconButton>
            </div>
          </div>
        )}
        <div className={`room__player__right ${showRight ? "hide" : ""}`}>
          <div className="room__player__right__buttons">
            <div className="room__player__right__inviteButtom">
              <button onClick={() => setOpenInviteFriendsDialog(true)}>
                Invite Friends
              </button>
            </div>
            <Dialog
              open={openInviteFriendsDialog}
              onClose={() => setOpenInviteFriendsDialog(false)}
            >
              <FriendListMessage
                closeDialog={() => setOpenInviteFriendsDialog(false)}
                type="roomText"
                room={true}
                link={window.location.href}
              />
            </Dialog>
            <div className="room__player__right__tabs">
              <div
                onClick={() => setSelectedTab("chat")}
                className={`room__player__right__tab ${
                  selectedTab === "chat" && "selected"
                }`}
              >
                <ChatIcon />
              </div>
              <div
                onClick={() => setSelectedTab("group")}
                className={`room__player__right__tab ${
                  selectedTab === "group" && "selected"
                }`}
              >
                <GroupIcon />
              </div>
              <div
                onClick={() => setSelectedTab("setting")}
                className={`room__player__right__tab ${
                  selectedTab === "setting" && "selected"
                }`}
              >
                {liveShowDetail.host === userId ? (
                  <SettingsIcon />
                ) : (
                  <InfoIcon />
                )}
              </div>
            </div>
          </div>
          {selectedTab === "chat" && (
            <>
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
                    <div
                      key={index}
                      className="messageContainer justifyStart alineCenter"
                    >
                      <div className="infoUser">
                        <Avatar src={message.profileImageUrl}></Avatar>
                      </div>

                      <div className="messageBox backgroundLight other borderRadius">
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
            </>
          )}
          {selectedTab === "group" && (
            <PeopleRoomTab
              socket={socket}
              roomCode={roomCode}
              // handleVideoChat={handleVideoChat}
              // startVideoChat={startVideoChat}
              // userVideo={userVideo}
              // peers={peers}
              // stream={videoStream}
            />
          )}
          {selectedTab === "setting" && <SettingRoomTab />}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
    fullName: state.user.fullName,
    profileImageUrl: state.user.profileImageUrl,
    userId: state.user._id,
    liveShowDetail: state.liveShow.liveShowDetail,
    authenticated: state.user.authenticated,
    authLoading: state.user.authLoading,
  };
};

export default connect(mapStateToProps, {
  getLiveShowDetail,
  updateVideoUrl,
  updateLiveShowInfo,
})(Room);
