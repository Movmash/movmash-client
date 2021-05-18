import React from "react";
import "./stylesheets/UserNamePlate.css";

import { Avatar } from "@material-ui/core";
function UserNamePlate({ imageUrl, type, name, username }) {
  return (
    <div className="userNamePlate">
      <div className="userNamePlate__header__userInfo">
        <Avatar src={imageUrl} />
        <div className="userNamePlate__header__userName--info">
          <div className="userNamePlate__header--name">
            <h3>{name}</h3>
          </div>
          {/* <div className="userNamePlate__header--username">
            <h4>{username}</h4>
          </div> */}
        </div>
      </div>
      <div className="userNamePlate__header__tags">
        <h4>{type}</h4>
      </div>
    </div>
  );
}

export default UserNamePlate;
