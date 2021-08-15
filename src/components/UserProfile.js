import React, { useState, useEffect } from "react";
import "./stylesheets/UserProfile.css";
import ProfilePosts from "./ProfilePosts";
import ProfileActivity from "./ProfileActivity";
import ProfileWatchlist from "./ProfileWatchlist";
import ProfileList from "./ProfileList";
import ViewCompactTwoToneIcon from "@material-ui/icons/ViewCompactTwoTone";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
import VideoLibraryTwoToneIcon from "@material-ui/icons/VideoLibraryTwoTone";
import { connect } from "react-redux";
import {
  getMashUserDetails,
  followUser,
  unfollowUser,
} from "../redux/actions/dataAction";
import { MoonLoader } from "react-spinners";
function UserProfile({
  userName,
  getMashUserDetails,
  userDetails,
  profileLoading,
  followingList,
  userId,
  followUser,
  unfollowUser,
}) {
  const [isFollow, setFollow] = useState(true);
  const {
    bio,
    coverImageUrl,
    followersCount,
    followingsCount,
    genre,
    fullName,
    postNumber,
    watchHour,
    profileImageUrl,
  } = userDetails;
  // console.log(userName);
  useEffect(() => {
    getMashUserDetails(userName);
    document.title = fullName;
    return () => {
      document.title = "Movmash";
    };
  }, [getMashUserDetails, userName, fullName]);
  useEffect(() => {
    if (userId !== undefined && followingList !== undefined) {
      setFollow(followingList.includes(userId));
    }
  }, [userId, followingList]);
  
  // console.log(userId);
  // console.log(isFollow);
  const [selected, setSelection] = useState("posts");
  // console.log(_id);
  const handleFollowClick = (userId) => {
    followUser(userId);
    setFollow(true);
  };
  const handleUnfollowClick = (userId) => {
    unfollowUser(userId);
    setFollow(false);
  };
  return (
    <div className="userProfile">
      {!profileLoading ? (
        <>
          <div className="userProfile__container">
            {" "}
            <div className="userProfile__profilePhotos">
              <div className="userProfile__coverPhoto">
                <img src={coverImageUrl} alt={userName} />
              </div>
              <div className="userProfile__displayPhoto">
                <img src={profileImageUrl} alt={userName} />
              </div>
              {isFollow ? (
                <div className="userProfile__profileButton">
                  <button
                    onClick={() => {
                      handleUnfollowClick(userId);
                    }}
                  >
                    following
                  </button>
                </div>
              ) : (
                <div className="userProfile__profileButton follow">
                  <button
                    onClick={() => {
                      handleFollowClick(userId);
                    }}
                  >
                    follow
                  </button>
                </div>
              )}

              {/*  */}
            </div>
            <div className="userProfile__userInfo">
              <div className="userProfile__userInfo__nameButton">
                <div className="userProfile__userInfo--name">
                  <h1>{userName}</h1>
                </div>
              </div>
              <div className="userProfile__userInfo__userName">
                <span>{fullName}</span>
              </div>
              <div className="userProfile__userInfo__personalityGenre">
                <span>{genre}</span>
              </div>
              <div className="userProfile__userInfo__userBio">
                <span>{bio}</span>
              </div>
            </div>
            <div className="userProfile__userData">
              <div className="userProfile__userData__row">
                <div className="userProfile__userData__rowItem">
                  <div className="userProfile__userData__rowItem--heading">
                    <h3>Posts</h3>
                  </div>
                  <span>{postNumber}</span>
                </div>
                <div className="userProfile__userData__rowItem">
                  <div className="userProfile__userData__rowItem--heading">
                    <h3>Followings</h3>
                  </div>
                  <span>{followingsCount}</span>
                </div>
                <div className="userProfile__userData__rowItem">
                  <div className="userProfile__userData__rowItem--heading">
                    <h3>Followers</h3>
                  </div>
                  <span>{followersCount}</span>
                </div>
                <div className="userProfile__userData__rowItem">
                  <div className="userProfile__userData__rowItem--heading">
                    <h3>Watch Hour</h3>
                  </div>
                  <span>{watchHour}h</span>
                </div>

                {/* <div className="userProfile__userData__rowItem">
                  <div className="userProfile__userData__rowItem--heading">
                    <h3>User Rating</h3>
                  </div>
                  <span>2.8</span>
                </div>
               */}
              </div>
              {/* <div className="userProfile__userData__row"></div> */}
            </div>
            <div className="userProfile__allPostButtons">
              <div
                onClick={() => {
                  setSelection("posts");
                }}
                className={`userProfile__allPostButton ${
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
                className={`userProfile__allPostButton ${
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
                className={`userProfile__allPostButton ${
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
                className={`userProfile__allPostButton ${
                  selected === "lists" ? "selected" : ""
                }`}
              >
                <VideoLibraryTwoToneIcon />
                <span>LISTS</span>
              </div>
            </div>
            <div className="userProfile__allPostContainer">
              {selected === "posts" && (
                <ProfilePosts
                  // id={_id}
                  userName={userName}
                  isMyProfile={false}
                />
              )}
              {selected === "activity" && (
                <ProfileActivity isMyProfile={false} userName={userName} />
              )}
              {selected === "watchList" && (
                <ProfileWatchlist isMyProfile={false} userName={userName} />
              )}
              {selected === "lists" && (
                <ProfileList isMyProfile={false} userName={userName} />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="home__bounceloader">
          <MoonLoader
            size={50}
            color={"#2aa44f"}
            loading
          />
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userDetails: state.data.mashUser,
    userId: state.data.mashUser._id,
    profileLoading: state.data.profileLoading,
    followingList: state.user.followings,
  };
};
export default connect(mapStateToProps, {
  getMashUserDetails,
  followUser,
  unfollowUser,
})(UserProfile);
