import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import DialogHeader from './DialogHeader';
import "./stylesheets/RoomInfoDialog.css";
import { ReactComponent as HostCrown } from "../icons/host_crown_2.svg";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';
function RoomInfoDialog({
  closeInfoDialog,
  roomCode,
  description,
  posterUrl,
  memberNumber,
  roomTitle,
  host,
  genre,
  privacy,
  userId
//   userList,
}) {
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const socket = useSocket();
  useEffect(() => {
    document.getElementById("root").style.filter = "blur(10px)";
    return () => {
      document.getElementById("root").style.filter = "blur(0px)";
    };
  },[]);
  const [tabName, setTabName] = useState("member");
useEffect(() => {
  if (socket) {
    socket.emit("get-user-in-the-room-for-room-info", {
      roomId: roomCode,
      userId: userId,
    });
  }
}, [socket, roomCode, userId]);
useEffect(() => {
  if (socket) {
    socket.on("user-list-inside-the-room-for-room-info", (data) => {
      setUserList(data);
    });
  }
}, [socket]);
// useEffect(() => {
//   // console.log(userList);
// }, [userList]);
  return (
    <div className="roomInfoDialog">
      <div className="roomInfoDialog__header">
        <DialogHeader
          heading={`${host.fullName}'s room`}
          close={closeInfoDialog}
          left={30}
        />
      </div>
      <div className="roomInfoDialog__content">
        <div className="roomInfoDialog__content__banner">
          <img src={posterUrl} alt={host.fullName} />
        </div>
        <div className="roomInfoDialog__content__tabs">
          <div
            onClick={() => setTabName("member")}
            className={`roomInfoDialog__content__tab ${
              tabName === "member" && "active"
            }`}
          >
            <span>Members ({userList.length})</span>
          </div>
          <div
            onClick={() => setTabName("details")}
            className={`roomInfoDialog__content__tab ${
              tabName === "details" && "active"
            }`}
          >
            <span>Details</span>
          </div>
        </div>
        {tabName === "member" ? (
          <div className="roomInfoDialog__content__tabContent">
            {userList.map((user) => (
              <div
                key={user.id}
                className="roomInfoDialog__content__tabContent__userInfo"
              >
                <Avatar src={user.profileImageUrl} alt={user.fullName} />
                {user.host && (
                  <div className="roomInfoDialog_hostCrownIcon">
                    <HostCrown />
                  </div>
                )}

                <span>{user.fullName}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="roomInfoDialog__content__tabContent details">
            <div className="roomInfoDialog__content__tabContent__roomTitle">
              <span>Room title: </span>
              {roomTitle === "" ? (
                <span className="italic">No title available</span>
              ) : (
                <span className="italic">{roomTitle}</span>
              )}
            </div>

            <div className="roomInfoDialog__content__tabContent__description">
              <span>Description: </span>
              {description === "" ? (
                <span className="italic">No description available</span>
              ) : (
                <span className="italic">{description}</span>
              )}
            </div>
            <div className="roomInfoDialog__content__tabContent__genre">
              <span>Genre: </span>
              {genre === "" ? (
                <span className="italic">No genre available</span>
              ) : (
                <span className="italic">Action</span>
              )}
            </div>
            <div className="roomInfoDialog__content__tabContent__privacy">
              <span>Privacy: </span>
              {privacy === "Private" ? (
                <div className="privacy__icon">
                  <LockIcon />
                  <span className="italic">Private</span>
                </div>
              ) : (
                <div className="privacy__icon">
                  <PublicIcon />
                  <span className="italic">Public</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="roomInfoDialog__button">
        <button onClick={() => history.push(`/live/room/${roomCode}`)}>
          Join party
        </button>
      </div>
    </div>
  );
}

export default RoomInfoDialog
