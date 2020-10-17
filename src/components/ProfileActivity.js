import React from "react";
import "./stylesheets/ProfileActivity.css";
import TabDescriptionInfo from "./TabDescriptionInfo";

import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
function ProfileActivity() {
  return (
    <div>
      <TabDescriptionInfo
        Icon={LocalActivityTwoToneIcon}
        info={"Your all like dislike of movies will be shown here"}
      />
    </div>
  );
}

export default ProfileActivity;
