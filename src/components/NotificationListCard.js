import React from "react";
import "./stylesheets/NotificationListCard.css";
import { Avatar } from "@material-ui/core";
function NotificationListCard({ imageUrl, type, userName, message }) {
  return (
    <div className="notificationListCard">
      <div className="notificationListCard__image">
        <Avatar src={imageUrl} />
      </div>
      <div className="notificationListCard__message">
        <p>
          <span>{userName}</span> {message}
        </p>
      </div>
    </div>
  );
}

export default NotificationListCard;
