import React from "react";
import "./stylesheets/ChatUserNamePlate.css";
import { Avatar } from "@material-ui/core";
function ChatUserNamePlate({ imageUrl, type, name, username }) {
  return (
    <div className="chatUserNamePlate">
      <div className="chatUserNamePlate__header__userInfo">
        <Avatar src={imageUrl} />
        <div className="chatUserNamePlate__header__userName--info">
          <div className="chatUserNamePlate__header--name">
            <h3>{name}</h3>
          </div>
          <div className="chatUserNamePlate__header--username">
            <h4>{username}</h4>
          </div>
        </div>
      </div>
      <div className="chatUserNamePlate__header__tags">
        <h4>{type}</h4>
      </div>
    </div>
  );
}

export default ChatUserNamePlate;
