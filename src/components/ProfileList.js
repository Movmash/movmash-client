import React from "react";
import "./stylesheets/ProfileList.css";
import TabDescriptionInfo from "./TabDescriptionInfo";
import VideoLibraryTwoToneIcon from "@material-ui/icons/VideoLibraryTwoTone";

function ProfileList() {
  return (
    <div>
      <TabDescriptionInfo
        isButton={true}
        info={
          "create your movie list so that people can find you who have same choice of movies like you"
        }
        Icon={VideoLibraryTwoToneIcon}
      />
    </div>
  );
}

export default ProfileList;
