import React from "react";
import "./stylesheets/ProfileWatchlist.css";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";

import TabDescriptionInfo from "./TabDescriptionInfo";
function ProfileWatchlist() {
  return (
    <div>
      <TabDescriptionInfo
        isButton={true}
        info={
          "Save the movie which you wanted to watch. People can see this and can send you the request"
        }
        Icon={BookmarkTwoToneIcon}
      />
    </div>
  );
}

export default ProfileWatchlist;
