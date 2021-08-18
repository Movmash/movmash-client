import React from "react";
import "./stylesheets/UserNamePlate.css";

import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function UserNamePlate({ imageUrl, type, name, username }) {
  const history = useHistory();
  return (
    <div className="userNamePlate">
      <div className="userNamePlate__header__userInfo">
        <Avatar src={imageUrl} />
        <div className="userNamePlate__header__userName--info">
          <div onClick={()=>history.push(`/@${username}`)} className="userNamePlate__header--name">
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
