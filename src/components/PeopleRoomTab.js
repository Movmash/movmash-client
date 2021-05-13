import React, { useState, useEffect } from "react";
import "./stylesheets/peopleRoomTab.css";
import { Avatar } from "@material-ui/core";
// import MicIcon from "@material-ui/icons/Mic";
// import VideocamIcon from "@material-ui/icons/Videocam";
// import VideocamOffIcon from "@material-ui/icons/VideocamOff";
// import MicOffIcon from "@material-ui/icons/MicOff";
// import VideoCallIcon from "@material-ui/icons/VideoCall";
import { useSocket } from "../contexts/SocketProvider";
import { connect } from "react-redux";
// import Peer from "simple-peer";
// import styled from "styled-components";
// const StyledVideo = styled.video`
//   transform: scaleX(-1);
//   object-fit: cover;
//   height: 200px;
//   width: 200px;
//   border-radius: 40px;
// `;
// function Video(props) {
//   const ref = useRef();
//   useEffect(() => {
//     props.peer.on("stream", (stream) => {
//       console.log(stream);
//       ref.current.srcObject = stream;
//     });
//   }, [props]);

//   return (
//     <>
//       <StyledVideo playsInline autoPlay ref={ref} />
//     </>
//   );
// }
function PeopleRoomTab({
  roomCode,
  userName,
  handleVideoChat,
  stream,
  peers,
  startVideoChat,
  userVideo,
}) {
  // peer.on("error", console.log);

  // const partnerVideo = useRef();
  //......
  // const [videoStream, setVideoStream] = useState({});
  // const [peers, setPeers] = useState([]);
  const socket = useSocket();
  // const userVideo = useRef();
  // const peersRef = useRef([]);
  const [userList, setUserList] = useState([]);
  // const [startVideoChat, setStartVideoChat] = useState(false);
  // useEffect(() => {
  //   if (userVideo.current) userVideo.current.srcObject = stream;
  // }, [userVideo.current]);
  // const handleVideoChat = useCallback(() => {
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
  //   // return () => {
  //   //   const peer = new Peer({
  //   //     initiator: true,
  //   //     trickle: false,
  //   //     stream: videoStream,
  //   //   });
  //   //   // stream.getTracks().forEach((track) => track.stop());
  //   //   console.log("closePeer");
  //   //   peer.removeAllListeners();

  //   //   peer.destroy();
  //   // };
  // }, [roomCode]);
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       userVideo.current.srcObject = stream;
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
  // }, []);

  // useEffect(() => {
  //   socket.on("close-peer", () => {
  //     const peer = new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream: videoStream,
  //     });
  //     // videoStream.getTracks().forEach((track) => track.stop());
  //     console.log("closePeer");
  //     peer.removeAllListeners();

  //     peer.destroy();
  //   });
  // }, []);
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
  //..................................................
  // useEffect(() => {
  //   if (socket && roomCode) {
  //     socket.emit("get-user-in-the-room", { roomId: `${roomCode}10` });
  //   }
  // }, [socket, roomCode]);
  useEffect(() => {
    if (socket) {
      socket.emit("get-user-in-the-room", { roomId: roomCode });
    }
  }, [socket, roomCode]);
  useEffect(() => {
    if (socket) {
      socket.on("user-list-inside-the-room", (data) => {
        setUserList(data);
        console.log(data);
      });
    }
  }, [socket]);
  //.....................................................
  // useEffect(() => {
  //   console.log("hell");
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       // if (userVideo.current) {
  //       userVideo.current.srcObject = stream;
  //       // }
  //       console.log(userVideo);
  //       socket.emit("get-user-in-the-room", { roomId: roomCode });
  //       socket.on("user-list-inside-the-room", (users) => {
  //         const peers = [];
  //         users.forEach((user) => {
  //           const peer = createPeer(user.id, socket.id, stream);
  //           peersRef.current.push({
  //             peerID: user.id,
  //             peer,
  //           });
  //           console.log(peersRef);
  //           peers.push(peer);
  //         });
  //         setPeers(peers);
  //       });
  //       console.log(peers);
  //       socket.on("user-joined-video-chat", (payload) => {
  //         console.log("user-joined-video-chat");
  //         const peer = addPeer(payload.signal, payload.callerID, stream);
  //         peersRef.current.push({
  //           peerID: payload.callerID,
  //           peer,
  //         });
  //         setPeers((users) => [...users, peer]);
  //       });
  //       socket.on("receiving-returned-signal", (payload) => {
  //         console.log("receiving-returning-signal");
  //         const item = peersRef.current.find((p) => p.peerID === payload.id);
  //         console.log(item.peer);
  //         item.peer.signal(payload.signal);
  //       });
  //     });
  // }, []);
  // function createPeer(userToSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socket.emit("sending-signal", {
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
  //     socket.emit("returning-signal", { signal, callerID });
  //   });

  //   peer.signal(incomingSignal);

  //   return peer;
  // }
  //......................................................

  return (
    <div className="peopleRoomTab">
      <div id="videoGrid" className="peopleRoomTab__memberList">
        {userList
          .filter((user) => user.name === userName)
          .map((user) => (
            <div key={user.id} className="peopleRoomTab__memberListCard">
              <div className="peopleRoomTab__memberList__header">
                <div className="infoUser">
                  <Avatar src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg" />
                  <span>{user.name}</span>
                </div>
                {user.host && <span className="tagHost">Host</span>}
              </div>
              {/* <div className="peopleRoomTab__memberList__videoContent">
                <div className="poepleRoomTab__memberList__videoContainer">
                  <img src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"></img>
                  <StyledVideo muted ref={userVideo} autoPlay playsInline />
                </div>
              </div>
              <div className="peopleRoomTab__memberList__footer">
                {!startVideoChat && (
                  <div
                    onClick={() => {
                      handleVideoChat();
                    }}
                    className="peopleRoomTab__memberList__button startVideoChat"
                  >
                    <VideoCallIcon />
                  </div>
                )}

                {startVideoChat && video ? (
                  <div
                    onClick={() => {
                      setVideo(false);
                      // playStop();
                    }}
                    className="peopleRoomTab__memberList__button"
                  >
                    <VideocamIcon />
                  </div>
                ) : (
                  startVideoChat && (
                    <div
                      onClick={() => {
                        setVideo(true);
                        // playStop();
                      }}
                      className="peopleRoomTab__memberList__button"
                    >
                      <VideocamOffIcon />
                    </div>
                  )
                )}
                {startVideoChat && audio ? (
                  <div
                    onClick={() => {
                      setAudio(false);
                      // muteUnmute();
                    }}
                    className="peopleRoomTab__memberList__button"
                  >
                    <MicIcon />
                  </div>
                ) : (
                  startVideoChat && (
                    <div
                      onClick={() => {
                        setAudio(true);
                        // muteUnmute();
                      }}
                      className="peopleRoomTab__memberList__button"
                    >
                      <MicOffIcon />
                    </div>
                  )
                )}
              </div>
             */}
            </div>
          ))}
        {userList
          .filter((user) => user.name !== userName)
          .map((user) => (
            <div key={user.id} className="peopleRoomTab__memberListCard">
              <div className="peopleRoomTab__memberList__header">
                <div className="infoUser">
                  <Avatar src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg" />
                  <span>{user.name}</span>
                </div>

                {user.host && <span className="tagHost">Host</span>}
              </div>
              {/* <div className="peopleRoomTab__memberList__videoContent">
                <div className="poepleRoomTab__memberList__videoContainer">
                  <img src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"></img>

                  {peers.length !== 0 && (
                    <Video
                      peer={
                        peers.filter((video) => video.id === user.id)[
                          peers.filter((video) => video.id === user.id).length -
                            1
                        ].peer
                      }
                    />
                  )}

                  {peers
                    .filter((video) => video.id === user.id)
                    .map((peerObj, index) => {
                      console.log(peerObj);
                      return <Video key={index} peer={peerObj.peer} />;
                    })}
                </div>
              </div>
             */}
            </div>
          ))}

        {/* {peers.map((peerObj, index) => {
          console.log(peerObj);
          return <Video key={index} peer={peerObj.peer} />;
        })} */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
  };
};

export default connect(mapStateToProps)(PeopleRoomTab);

// const connectToNewUser = (userName, stream) => {
//   const call = peer.call(userName, stream);
//   call.on("stream", (userVideoStream) => {
//     setVideoStreamList((prev) => [...prev, userVideoStream]);
//   });
//   //call.on('close')
// };

//  const handleVideoChat = () => {
//    // setStartVideoChat(true);
//    navigator.mediaDevices
//      .getUserMedia({
//        video: true,
//        audio: true,
//      })
//      .then((stream) => {
//        setVideoStream(stream);
//        if (videoPlayer.current) {
//          videoPlayer.current.srcObject = stream;
//          peer.on("call", (call) => {
//            call.answer(stream);
//            call.on("stream", (userVideoStream) => {
//              setVideoStreamList((prev) => [...prev, userVideoStream]);
//            });
//          });
//          setStartVideoChat(true);
//          socket.on("user-connected-to-video-chat", (id) => {
//            connectToNewUser(id, stream);
//          });
//          if (video) {
//            videoPlayer.current.srcObject.available = true;
//          } else {
//            videoPlayer.current.srcObject.available = false;
//          }
//          if (audio) {
//            stream.getAudioTracks()[0].enabled = true;
//          } else {
//            stream.getAudioTracks()[0].enabled = false;
//          }
//        }
//      });
//  };
