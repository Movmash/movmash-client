import React, { useState, useEffect } from "react";
import "./stylesheets/MyProfile.css";
import ViewCompactTwoToneIcon from "@material-ui/icons/ViewCompactTwoTone";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
import VideoLibraryTwoToneIcon from "@material-ui/icons/VideoLibraryTwoTone";
import ProfilePosts from "./ProfilePosts";
import ProfileActivity from "./ProfileActivity";
import ProfileList from "./ProfileList";
import ProfileWatchlist from "./ProfileWatchlist";
import { Avatar, Dialog } from "@material-ui/core";
import EditProfile from "./EditProfile";
import { PhotoCamera } from "@material-ui/icons";
import { connect } from "react-redux";
import FriendListProfile from "./FriendListProfile";
import {
  updateProfilePicture,
  updateCoverPicture,
} from "../redux/actions/userAction";
import { MoonLoader } from "react-spinners";
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
  updateProfilePicture,
  loading,
  updateCoverPicture,
  userId,
  followings,
  followers,
}) {
  const [selected, setSelection] = useState("posts");
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const [openFriendList, setOpenFriendList] = useState(false);
  const [openTab, setOpenTab] = useState("");
  const onCloseEditProfileDialog = () => {
    setOpenEditProfileDialog(false);
  };
  const onOpenEditProfileDialog = () => {
    setOpenEditProfileDialog(true);
  };
  useEffect(() => {
    document.title = fullName;
    return () => {
      document.title = "Movmash";
    };
  }, [fullName]);
  const uploadProfilePicture = (file) => {
    // console.log("heloo this is prifl;");
    updateProfilePicture(file);
    
  };
  const uploadCoverPicture = (file) => {
    updateCoverPicture(file);
  };
  const handleCloseFriendList = () => {
    setOpenFriendList(false);
  };
  const handleOpenFriendList = (tab) => {
    setOpenFriendList(true);
    setOpenTab(tab);
  };
  return (
    <div className="myProfile">
      {loading ? (
        <div className="home__bounceloader">
          <MoonLoader size={50} color={"#2aa44f"} loading />
        </div>
      ) : (
        <div className="myProfile__container">
          {" "}
          <div className="myProfile__profilePhotos">
            <div className="myProfile__coverPhoto">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => uploadCoverPicture(e.target.files[0])}
              />
              <label className="upload" htmlFor="icon-button-file">
                <PhotoCamera />
                <span>Choose Photo</span>
              </label>
              <img src={coverImageUrl} alt="" />
            </div>
            <div className="myProfile__displayPhoto">
              <input
                accept="image/*"
                id="icon-button-file-1"
                type="file"
                onChange={(e) => uploadProfilePicture(e.target.files[0])}
              />
              <label className="upload" htmlFor="icon-button-file-1">
                <PhotoCamera />
                <span>Choose Photo</span>
              </label>
              
              <Avatar src={profileImageUrl} />
            </div>
            <div className="myProfile__profileButton">
              <button onClick={onOpenEditProfileDialog}>Edit Profile</button>
            </div>
            <Dialog
              open={openEditProfileDialog}
              onClose={onCloseEditProfileDialog}
            >
              <EditProfile genre={genre} close={onCloseEditProfileDialog} />
            </Dialog>
          </div>
          <div className="myProfile__userInfo">
            <div className="myProfile__userInfo__nameButton">
              <div className="myProfile__userInfo--name">
                <h1>{fullName}</h1>
              </div>
            </div>
            <div className="myProfile__userInfo__userName">
              <span>{userName}</span>
            </div>
            <div className="myProfile__userInfo__personalityGenre">
              <span>{genre.join(" | ")}</span>
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
                <div
                  onClick={() => handleOpenFriendList("followings")}
                  className="myProfile__userData__rowItem--heading"
                >
                  <h3>Followings</h3>
                </div>
                <span>{followingsCount}</span>
              </div>
              <div className="myProfile__userData__rowItem">
                <div
                  onClick={() => handleOpenFriendList("followers")}
                  className="myProfile__userData__rowItem--heading"
                >
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
{/* 
              <div className="myProfile__userData__rowItem">
                <div className="myProfile__userData__rowItem--heading">
                  <h3>User Rating</h3>
                </div>
                <span>2.8</span>
              </div>
             */}
            </div>
            {/* <div className="myProfile__userData__row"></div> */}
            <Dialog onClose={handleCloseFriendList} open={openFriendList}>
              <FriendListProfile
                closeDialog={handleCloseFriendList}
                openTab={openTab}
                userId={userId}
                myFollowers={followers}
                myFollowings={followings}
                myProfile={true}
              />
            </Dialog>
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
            {selected === "watchList" && (
              <ProfileWatchlist isMyProfile={true} />
            )}
            {selected === "lists" && <ProfileList isMyProfile={true} />}
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    followers: state.user.followers,
    followings: state.user.followings,
    userId: state.user._id
  }
}
export default connect(mapStateToProps, {
  updateProfilePicture,
  updateCoverPicture,
})(MyProfile);
