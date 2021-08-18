import React from "react";
import "./stylesheets/NotificationListCard.css";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function NotificationListCard({ imageUrl, type, userName, message,postId }) {
  const history = useHistory();

  return (
    <div
      onClick={() => {if(type !== "following") {
        history.push(`/post/${postId}`);
      }else{
        history.push(`/@${userName}`);
      }} }
      className="notificationListCard"
    >
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
