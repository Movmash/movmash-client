import React, { useState, useEffect } from "react";
import "./stylesheets/FriendListMessage.css";
import axios from "../util/axios";
import { Avatar } from "@material-ui/core";
import DialogHeader from "./DialogHeader";
import "./stylesheets/FriendListProfile.css";
import {connect} from "react-redux";
import { followUser, unfollowUser } from "../redux/actions/dataAction";
import { removeFollower, undoRemoveFollower } from "../redux/actions/userAction";
function FriendListProfile({
  closeDialog,
  openTab,
  userId,
  myFollowings,
  myFollowers,
  myProfile,
  followUser,
  unfollowUser,
  removeFollower,
  undoRemoveFollower,
}) {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [filterFollowers, setFilteredFollowers] = useState([]);
  const [filterFollowings, setFilteredFollowings] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(openTab);
  useEffect(() => {
    axios
      .get(`/api/v1/home/get-followers/${userId}`)
      .then((res) => {
        setFollowers(res.data);
        setFilteredFollowers(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  }, [selectedTab, userId]);
  useEffect(() => {
    axios
      .get(`/api/v1/home/get-followings/${userId}`)
      .then((res) => {
        setFollowings(res.data);
        setFilteredFollowings(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  }, [selectedTab, userId]);
  useEffect(() => {
    setFilteredFollowers(
      followers.filter((user) =>
        user.userName.toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }, [followers, filterQuery]);
  useEffect(() => {
    setFilteredFollowings(
      followings.filter((user) =>
        user.userName.toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }, [followings, filterQuery]);
  const handleFollowUser = (userId) => {
    followUser(userId);
  };
  const handleUnfollowUser = (userId) => {
    unfollowUser(userId);
  };
  const handleRemoveFollower = (userId) => {
    removeFollower(userId);
  };
  const handleUndoRemoveFollower = (userId) => {
    undoRemoveFollower(userId);
  }
  return (
    <div className="friendListMessage">
      <div className="friendListMessage__heading">
        <DialogHeader
          heading="Send Message"
          close={() => {
            closeDialog(false);
          }}
          left={21.5}
        />
      </div>
      <div className="friendListMessage__content">
        <div className="friendListMessage__searchInput">
          <input
            onChange={(e) => {
              setFilterQuery(e.target.value);
            }}
            type="text"
            placeholder="search..."
          />
        </div>
        <div className="friendListMessage__tabs">
          <div
            onClick={() => setSelectedTab("followers")}
            className={`friendListMessage__tab followers ${
              selectedTab === "followers" && "selected"
            }`}
          >
            <span>followers</span>
          </div>
          <div
            onClick={() => setSelectedTab("followings")}
            className={`friendListMessage__tab followings ${
              selectedTab === "followings" && "selected"
            }`}
          >
            <span>followings</span>
          </div>
        </div>

        {selectedTab === "followers" && (
          <div className="friendListMessage__listContainer">
            {filterFollowers.map((user) => (
              <div key={user._id} className="friendListCard">
                <div className="friendListCard__content__avatar">
                  <Avatar src={user.profileImageUrl} />
                  <span>{user.userName}</span>
                </div>
                {myProfile ? (
                  <>
                    {myFollowers.includes(user._id) ? (
                      <div className="peopleMatchCard__content__button unhighlighted">
                        <button
                          onClick={() => {
                            handleRemoveFollower(user._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="peopleMatchCard__content__button">
                        <button
                          onClick={() => {
                            handleUndoRemoveFollower(user._id);
                          }}
                        >
                          Undo
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {myFollowers.includes(user._id) ? (
                      <div className="peopleMatchCard__content__button unhighlighted">
                        <button onClick={() => handleUnfollowUser(user._id)}>
                          Following
                        </button>
                      </div>
                    ) : (
                      <div className="peopleMatchCard__content__button">
                        <button onClick={() => handleFollowUser(user._id)}>
                          Follow
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {selectedTab === "followings" && (
          <div className="friendListMessage__listContainer">
            {filterFollowings.map((user) => (
              <div key={user._id} className="friendListCard">
                {" "}
                <div className="friendListCard__content__avatar">
                  <Avatar src={user.profileImageUrl} />
                  <span>{user.userName}</span>
                </div>
                {myProfile ? (
                  <>
                    {myFollowings.includes(user._id) ? (
                      <div className="peopleMatchCard__content__button unhighlighted">
                        <button onClick={() => handleUnfollowUser(user._id)}>
                          Following
                        </button>
                      </div>
                    ) : (
                      <div className="peopleMatchCard__content__button">
                        <button onClick={() => handleFollowUser(user._id)}>
                          Follow
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {myFollowings.includes(user._id) ? (
                      <div className="peopleMatchCard__content__button unhighlighted">
                        <button onClick={() => handleUnfollowUser(user._id)}>
                          Following
                        </button>
                      </div>
                    ) : (
                      <div className="peopleMatchCard__content__button">
                        <button onClick={() => handleFollowUser(user._id)}>
                          Follow
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default connect(null, {
  followUser,
  unfollowUser,
  removeFollower,
  undoRemoveFollower,
})(FriendListProfile);
