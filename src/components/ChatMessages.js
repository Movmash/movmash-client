import React, { useEffect } from "react";
import "./stylesheets/ChatMessages.css";
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getRoomChats } from "../redux/actions/chatAction";

function ChatMessages({ getRoomChats, messages, userId }) {
  const { roomId } = useParams();
  //   console.log(params);

  useEffect(() => {
    getRoomChats(roomId);
  }, [roomId, getRoomChats]);
  return (
    <div>
      {messages.map((chatMessage) =>
        chatMessage.sender._id === userId ? (
          <div key={chatMessage._id} className="messageContainer justifyEnd">
            {/* <p className="sentText pr-10">dasdsdas</p> */}
            <div className="messageBox backgroundBlue mine">
              <p className="messageText colorWhite"> {chatMessage.message}</p>
            </div>
          </div>
        ) : (
          <div key={chatMessage._id} className="messageContainer justifyStart">
            <Avatar src={chatMessage.sender.profileImageUrl}></Avatar>
            <div className="messageBox backgroundLight other">
              <p className="messageText colorDark">{chatMessage.message}</p>
            </div>
            {/* <p className="sentText pl-10 ">usersaddasd</p> */}
          </div>
        )
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages,
    userId: state.user._id,
  };
};

export default connect(mapStateToProps, { getRoomChats })(ChatMessages);
