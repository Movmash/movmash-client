import React from "react";
import "./stylesheets/ChatUserNamePlate.css";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";

function ChatUserNamePlate({ imageUrl, type, name, lastMessage, userId }) {
  return (
    <div className="chatUserNamePlate">
      <div className="chatUserNamePlate__header__userInfo">
        <Avatar src={imageUrl} />
        <div className="chatUserNamePlate__header__userName--info">
          <div className="chatUserNamePlate__header--name">
            <h3>{name}</h3>
          </div>
          <div className="chatUserNamePlate__header--username">
            <h4>{lastMessage.message}</h4>
          </div>
        </div>
      </div>
      {userId === lastMessage.recipient && lastMessage.read === false && (
        <div className="chatUserNamePlate__header__tags readStatus">
          {/* <h4>{"ankur"}</h4> */}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.user._id,
  };
};
export default connect(mapStateToProps)(ChatUserNamePlate);
