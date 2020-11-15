import React from "react";
import "./stylesheets/ProfileActivity.css";
import TabDescriptionInfo from "./TabDescriptionInfo";

import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
function ProfileActivity({ isMyProfile }) {
  return (
    <div>
      <TabDescriptionInfo
        Icon={LocalActivityTwoToneIcon}
        info={
          isMyProfile
            ? "Your all like dislike of movies will be shown here"
            : "No Activity available"
        }
      />
    </div>
  );
}

export default ProfileActivity;
