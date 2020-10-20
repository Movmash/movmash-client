import React, { useState } from "react";
import "./stylesheets/MyProfile.css";
import ViewCompactTwoToneIcon from "@material-ui/icons/ViewCompactTwoTone";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
import VideoLibraryTwoToneIcon from "@material-ui/icons/VideoLibraryTwoTone";
import ProfilePosts from "./ProfilePosts";
import ProfileActivity from "./ProfileActivity";
import ProfileList from "./ProfileList";
import ProfileWatchlist from "./ProfileWatchlist";
function MyProfile({
  bio,
  coverImageUrl,
  followersCount,
  followingsCount,
  genre,
  fullName,
  userName,
  postNumber,
  watchHour,
  profileImageUrl,
}) {
  const [selected, setSelection] = useState("posts");
  return (
    <div className="myProfile">
      <div className="myProfile__container">
        {" "}
        <div className="myProfile__profilePhotos">
          <div className="myProfile__coverPhoto">
            <img src={coverImageUrl} alt={userName} />
          </div>
          <div className="myProfile__displayPhoto">
            <img src={profileImageUrl} alt={userName} />
          </div>
          <div className="myProfile__profileButton">
            <button>Edit Profile</button>
          </div>
        </div>
        <div className="myProfile__userInfo">
          <div className="myProfile__userInfo__nameButton">
            <div className="myProfile__userInfo--name">
              <h1>{userName}</h1>
            </div>
          </div>
          <div className="myProfile__userInfo__userName">
            <span>{fullName}</span>
          </div>
          <div className="myProfile__userInfo__personalityGenre">
            <span>{genre}</span>
          </div>
          <div className="myProfile__userInfo__userBio">
            <span>{bio}</span>
          </div>
        </div>
        <div className="myProfile__userData">
          <div className="myProfile__userData__row">
            <div className="myProfile__userData__rowItem">
              <div className="myProfile__userData__rowItem--heading">
                <h3>Posts</h3>
              </div>
              <span>{postNumber}</span>
            </div>
            <div className="myProfile__userData__rowItem">
              <div className="myProfile__userData__rowItem--heading">
                <h3>Followings</h3>
              </div>
              <span>{followingsCount}</span>
            </div>
            <div className="myProfile__userData__rowItem">
              <div className="myProfile__userData__rowItem--heading">
                <h3>Followers</h3>
              </div>
              <span>{followersCount}</span>
            </div>
            <div className="myProfile__userData__rowItem">
              <div className="myProfile__userData__rowItem--heading">
                <h3>Watch Hour</h3>
              </div>
              <span>{watchHour}h</span>
            </div>
            <div className="myProfile__userData__rowItem">
              <div className="myProfile__userData__rowItem--heading">
                <h3>User Rating</h3>
              </div>
              <span>2.8</span>
            </div>
          </div>
          {/* <div className="myProfile__userData__row"></div> */}
        </div>
        <div className="myProfile__allPostButtons">
          <div
            onClick={() => {
              setSelection("posts");
            }}
            className={`myProfile__allPostButton ${
              selected === "posts" ? "selected" : ""
            }`}
          >
            <ViewCompactTwoToneIcon />
            <span>POSTS</span>
          </div>
          <div
            onClick={() => {
              setSelection("activity");
            }}
            className={`myProfile__allPostButton ${
              selected === "activity" ? "selected" : ""
            }`}
          >
            <LocalActivityTwoToneIcon />
            <span>ACTIVITY</span>
          </div>
          <div
            onClick={() => {
              setSelection("watchList");
            }}
            className={`myProfile__allPostButton ${
              selected === "watchList" ? "selected" : ""
            }`}
          >
            <BookmarkTwoToneIcon />
            <span>WATCHLIST</span>
          </div>
          <div
            onClick={() => {
              setSelection("lists");
            }}
            className={`myProfile__allPostButton ${
              selected === "lists" ? "selected" : ""
            }`}
          >
            <VideoLibraryTwoToneIcon />
            <span>LISTS</span>
          </div>
        </div>
        <div className="myProfile__allPostContainer">
          {selected === "posts" && <ProfilePosts isMyProfile={true} />}
          {selected === "activity" && <ProfileActivity isMyProfile={true} />}
          {selected === "watchList" && <ProfileWatchlist isMyProfile={true} />}
          {selected === "lists" && <ProfileList isMyProfile={true} />}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
