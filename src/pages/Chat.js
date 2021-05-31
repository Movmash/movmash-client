import React, { useEffect, useState } from "react";
import "./stylesheets/Chat.css";
// import UserNamePlate from "../components/UserNamePlate";
// import { Avatar } from "@material-ui/core";
// import io from "socket.io-client";
import { connect } from "react-redux";
import TelegramIcon from "@material-ui/icons/Telegram";
import ScrollToBottom from "react-scroll-to-bottom";
import FriendListMessage from "../components/FriendListMessage";
import SendIcon from "@material-ui/icons/Send";
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
import { Avatar, IconButton } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
// let socket;
function Chat({
  getAllRooms,
  rooms,
  userId,
  addInChats,
  updateRooms,
  markChatRoomRead,
  messages,
  authenticated,
  authLoading,
}) {
  const roomIdParams = useParams();
  const [selectedUser, setSelectedUser] = useState({});
  // const [selectedUserName, setSelectedUserName] = useState("");
  const [message, setMessage] = useState("");
  // const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const socket = useSocket();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!authLoading){
      if (authenticated){
         getAllRooms();
        }
    else{ 
      history.push("/login");
      }   
    } 
    // return () => {};
  }, [getAllRooms, authLoading, history, authenticated]);
  useEffect(() => {
    if (messages[0] !== undefined) {
      if (userId === messages[0].sender._id) {
        setSelectedUser(messages[0].recipient);
      } else {
        setSelectedUser(messages[0].sender);
      }
    }
  }, [userId,messages]);
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
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClickOnUserList = (userDetails, room_Id, lastMessage) => {
    history.push(`/messages/inbox/${room_Id}`);
    // setSelectedUserName(userDetails.userName);
    setSelectedUser({ ...userDetails });
    // setRoomId(room_Id);
    if (lastMessage !== undefined && userId !== lastMessage.sender) {
      markChatRoomRead(room_Id);
    }
    // socket.emit("join-chat", { roomId: roomId, userDetails });
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      roomId: roomIdParams.roomId,
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
            <span onClick={handleOpenDialog}>
              <CreateIcon />
            </span>
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
                    handleClickOnUserList(
                      userDetails,
                      room._id,
                      room.lastMessage
                    );
                  }}
                  className={`chat_container__left__user__list ${
                    room._id === roomIdParams.roomId ? "selected" : ""
                  }`}
                >
                  <ChatUserNamePlate
                    name={userDetails.fullName}
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
            {/* {selectedUserName !== "" ? ( */}
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
                        <h3>{selectedUser.fullName}</h3>
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
                <div className="chat_container__right__input room__player__right__chat__input">
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
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                  {/* <button type="submit">submit</button> */}
                </div>
              </form>
            </>
            {/* ) : null} */}
          </div>
        ) : (
          <div className="chat_container__right noUserSelected">
            <div className="chat_container__right__sendMessageContainer">
              <div className="chat_container__right__sendMessageContainer__logo">
                <TelegramIcon />
              </div>
              <span>Send private message to your friends</span>
              <button onClick={handleOpenDialog} className="chat__sendMessage">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      <Dialog onClose={handleCloseDialog} open={openDialog}>
        <FriendListMessage closeDialog={setOpenDialog} />
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    rooms: state.chat.rooms,
    userId: state.user._id,
    messages: state.chat.messages,
    authenticated: state.user.authenticated,
    authLoading: state.user.authLoading,
  };
};
export default connect(mapStateToProps, {
  getAllRooms,
  addInChats,
  updateRooms,
  markChatRoomRead,
})(Chat);
