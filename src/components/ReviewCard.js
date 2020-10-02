import React from "react";
import "./stylesheets/ReviewCard.css";
import { Avatar, IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ShareIcon from "@material-ui/icons/Share";

function ReviewCard() {
  return (
    <div className="reviewCard">
      <div className="reviewCard__heading">
        <div className="reviewCard__heading--userInfo">
          <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C" />
          <div className="reviewCard__heading--userInfo--nameUser">
            <div className="reviewCard__heading--userInfo--name">
              <h3>Ankur Kunal</h3>
            </div>
            <div className="reviewCard__heading--userInfo--userName">
              <h4>@i.m.ak_47</h4>
            </div>
          </div>
          <div className="reviewCard__heading--userInfo--rating"></div>
        </div>
        <div className="reviewCard__heading--tags">
          <h4>Highly Rated</h4>
        </div>
      </div>
      <div className="reviewCard__content">
        <h3>
          A nameless first person narrator (Edward Norton) attends support
          groups in attempt to subdue his emotional state and relieve his
          insomniac state. When he meets Marla (Helena Bonham Carter), another
          fake attendee of support groups, his life seems to become a little
          more bearable. However when he associates himself with Tyler (Brad
          Pitt) he is dragged into an underground fight club and soap making
          scheme. Together the two men spiral out of control and engage in
          competitive rivalry for love and power. When the narrator is exposed
          to the hidden agenda of Tyler's fight club, he must accept the awful
          truth that Tyler may not be who he says he is. Written by Ankur Kunal
        </h3>
      </div>
      <div className="reviewCard__buttons">
        <div className="reviewCard__button">
          <IconButton>
            <ThumbUpAltIcon />
          </IconButton>
        </div>
        <div className="reviewCard__button">
          {" "}
          <IconButton>
            <ThumbDownIcon />
          </IconButton>
        </div>
        <div className="reviewCard__button">
          {" "}
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>
        </div>
        <div className="reviewCard__button">
          {" "}
          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
