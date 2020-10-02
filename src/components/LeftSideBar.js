import React from "react";
import "./stylesheets/LeftSideBar.css";
import { IconButton, Avatar } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import AddIcon from "@material-ui/icons/Add";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import SettingsIcon from "@material-ui/icons/Settings";
function LeftSideBar() {
  return (
    <div className="leftSideBar">
      <div className="leftSideBar__container">
        <div className="leftSideBar__container__icon">
          <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C" />
        </div>
        <div className="leftSideBar__container__icon">
          <IconButton>
            <TelegramIcon />
          </IconButton>
        </div>
        <div className="leftSideBar__container__icon">
          <div className="leftSideBar__container__icons--add">
            <IconButton>
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div className="leftSideBar__container__icon">
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
        </div>
        <div className="leftSideBar__container__icon">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
