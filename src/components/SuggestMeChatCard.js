import React from "react";
import "./stylesheets/SuggestMeChatCard.css";
import { Avatar } from "@material-ui/core";
function SuggestMeChatCard({ postData }) {
  return (
    <div className="suggestMeChatCard">
      {postData && (
        <div className="reviewChatCard__container">
          <div className="reviewChatCard__header">
            <Avatar src={postData.postedBy.profileImageUrl}></Avatar>
            <span>{postData.postedBy.userName}</span>
          </div>
          <div className="reviewChatCard__content">
            <div className="suggestMePost__container__suggestionDetailes--rating suggestMeChatCard__Container">
              <div className="suggestMePost__container__suggestionDetailes--rating--heading">
                <h4>Rating Above</h4>
              </div>
              <div className="suggestMePost__container__suggestionDetailes--rating--content">
                <h1>{postData.rating}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestMeChatCard;
