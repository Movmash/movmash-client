import React, { useEffect, useState } from "react";
import "./stylesheets/Chat.css";
// import UserNamePlate from "../components/UserNamePlate";
// import { Avatar } from "@material-ui/core";
// import io from "socket.io-client";
import { connect } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  getAllRooms,
  addInChats,
  updateRooms,
  markChatRoomRead,
} from "../redux/actions/chatAction";
import ChatUserNamePlate from "../components/ChatUserNamePlate";
import ChatMessages from "../components/ChatMessages";
import { useHistory, useParams } from "react-router-dom";
import { useSocket } from "../contexts/SocketProvider";
import { Avatar } from "@material-ui/core";
// let socket;
function Chat({
  getAllRooms,
  rooms,
  userId,
  addInChats,
  updateRooms,
  markChatRoomRead,
}) {
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserName, setSelectedUserName] = useState("");
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const socket = useSocket();
  const roomIdParams = useParams();
  useEffect(() => {
    getAllRooms();

    // return () => {};
  }, [getAllRooms]);
  // useEffect(() => {
  //   if (userId !== undefined && socket !== undefined) {
  //     socket.emit("join-chat", { userId: userId });
  //   }
  // }, [userId, socket]);
  useEffect(() => {
    if (socket !== undefined) {
      socket.on("message-room", (roomData) => {
        console.log(roomData);
        updateRooms(roomData);
      });
    }
  }, [socket, updateRooms]);
  useEffect(() => {
    console.log(socket);
    if (socket !== undefined) {
      socket.on("message", (message) => {
        console.log(message);
        addInChats(message);
        // setMessages((messages) => [...messages, message]);
      });
      return () => {
        console.log("leave");
        socket.off();
      };
    }
  }, [addInChats, socket]);
  const handleClickOnUserList = (userDetails, room_Id) => {
    history.push(`/messages/inbox/${room_Id}`);
    setSelectedUserName(userDetails.userName);
    setSelectedUser({ ...userDetails });
    setRoomId(room_Id);
    markChatRoomRead(room_Id);
    // socket.emit("join-chat", { roomId: roomId, userDetails });
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      roomId: roomId,
      sender: userId,
      recipient: selectedUser._id,
      message: message,
    };

    if (message !== "" && socket !== undefined) {
      socket.emit("sendMessage", messageData);
      // console.log(messageData);
      setMessage("");
    }
  };
  return (
    <div className="chat">
      <div className="chat_container">
        <div className="chat_container__left">
          <div className="chat_container__left__header">
            <h1>Messages</h1>
          </div>
          <div className="chat_container__left__userList">
            {rooms.map((room) => {
              const userDetails = room.participants.find(
                (user) => user._id !== userId
              );

              return (
                <div
                  key={room._id}
                  onClick={() => {
                    handleClickOnUserList(userDetails, room._id);
                  }}
                  className={`chat_container__left__user__list ${
                    userDetails.userName === selectedUserName ? "selected" : ""
                  }`}
                >
                  <ChatUserNamePlate
                    name={userDetails.userName}
                    imageUrl={userDetails.profileImageUrl}
                    lastMessage={room.lastMessage}
                    // username={`Iamak47`}
                  />
                </div>
              );
            })}
            {/* <div className="chat_container__left__user__list ">
              <UserNamePlate
                name="Ankur Kunal"
                imageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                username={`Iamak47`}
                //   type="Suggest Me"
              />
            </div> */}
          </div>
        </div>
        {roomIdParams.roomId ? (
          <div className="chat_container__right">
            {selectedUserName !== "" ? (
              <>
                {" "}
                <div className="chat_container__right__header">
                  {/* <UserNamePlate
                  name={selectedUser.userName}
                  imageUrl={selectedUser.profileImageUrl}
                  username={`Iamak47`}
                /> */}
                  <div className="chatUserNamePlate__header__container">
                    <div className="chatUserNamePlate__header__userInfo chatHeader">
                      <Avatar src={selectedUser.profileImageUrl} />
                      <div className="chatUserNamePlate__header__userName--info">
                        <div className="chatUserNamePlate__header--name">
                          <h3>{selectedUser.userName}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat_container__right__messages">
                  <ScrollToBottom className="chat_container__right__messages">
                    <ChatMessages />
                  </ScrollToBottom>
                </div>
                <form onSubmit={handleSendMessage}>
                  <div className="chat_container__right__input">
                    <input
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      type="text"
                      onContextMenu={() => {
                        console.log("start");
                      }}
                      placeholder="send message ..."
                    ></input>
                    <button type="submit">submit</button>
                  </div>
                </form>
              </>
            ) : null}
          </div>
        ) : (
          <div className="chat_container__right">heyy there</div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    rooms: state.chat.rooms,
    userId: state.user._id,
  };
};
export default connect(mapStateToProps, {
  getAllRooms,
  addInChats,
  updateRooms,
  markChatRoomRead,
})(Chat);
