import React from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./stylesheets/TabDescriptionInfo.css";
// import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
function TabDescriptionInfo({ Icon, info, isButton }) {
  return (
    <div className="tabDescriptionInfo">
      <div className="tabDescriptionInfo__logo">
        <Icon />
      </div>
      <div className="tabDescriptionInfo__description">
        <span>{info}</span>
      </div>
      {isButton && (
        <div className="tabDescriptionInfo__button">
          <div className="leftSideBar__container__icons--add">
            <IconButton>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default TabDescriptionInfo;
