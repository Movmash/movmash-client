import React, { useEffect } from "react";
import "./stylesheets/ChatMessages.css";
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getRoomChats, clearChat } from "../redux/actions/chatAction";
import MovieChatCard from "./MovieChatCard";
import ReviewChatCard from "./ReviewChatCard";
import SuggestMeChatCard from "./SuggestMeChatCard";

function ChatMessages({ getRoomChats, messages, userId, clearChat }) {
  const { roomId } = useParams();
  //   console.log(params);

  useEffect(() => {
    console.log(roomId);
    if (roomId !== undefined) {
      getRoomChats(roomId);
    }
    return () => {
      clearChat();
    };
  }, [roomId, getRoomChats]);
  return (
    <div>
      {messages.map((chatMessage) =>
        chatMessage.sender._id === userId ? (
          <div key={chatMessage._id} className="messageContainer justifyEnd">
            {/* <p className="sentText pr-10">dasdsdas</p> */}
            {chatMessage.message !== undefined ? (
              chatMessage.type === "movie" ? (
                <div className="messageBox backgroundBlue mine ">
                  <MovieChatCard movieData={chatMessage.movieData} />
                </div>
              ) : chatMessage.type === "review" ? (
                <div className="messageBox backgroundBlue mine">
                  <ReviewChatCard postData={chatMessage.postData} />
                </div>
              ) : chatMessage.type === "suggestMe" ? (
                <div className="messageBox backgroundBlue mine ">
                  <SuggestMeChatCard postData={chatMessage.postData} />
                </div>
              ) : (
                <div className="messageBox backgroundBlue mine">
                  <p className="messageText colorWhite">
                    {" "}
                    {chatMessage.message}
                  </p>
                </div>
              )
            ) : null}
          </div>
        ) : (
          <div key={chatMessage._id} className="messageContainer justifyStart">
            {chatMessage.message && chatMessage.type === "movie" ? (
              <>
                {" "}
                <Avatar src={chatMessage.sender.profileImageUrl}></Avatar>
                <div className="messageBox backgroundLight other">
                  <MovieChatCard movieData={chatMessage.movieData} />
                </div>
              </>
            ) : chatMessage.type === "review" ? (
              <>
                {" "}
                <Avatar src={chatMessage.sender.profileImageUrl}></Avatar>
                <div className="messageBox backgroundLight other">
                  <ReviewChatCard postData={chatMessage.postData} />
                </div>
              </>
            ) : chatMessage.type === "suggestMe" ? (
              <>
                {" "}
                <Avatar src={chatMessage.sender.profileImageUrl}></Avatar>
                <div className="messageBox backgroundLight other">
                  <SuggestMeChatCard postData={chatMessage.postData} />
                </div>
              </>
            ) : (
              chatMessage.message && (
                <>
                  <Avatar src={chatMessage.sender.profileImageUrl}></Avatar>
                  <div className="messageBox backgroundLight other">
                    <p className="messageText colorDark">
                      {chatMessage.message}
                    </p>
                  </div>
                </>
              )
            )}
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

export default connect(mapStateToProps, { getRoomChats, clearChat })(
  ChatMessages
);
