import React, { useState, useEffect } from "react";
import "./stylesheets/FriendListMessage.css";
import axios from "../util/axios";
import { Avatar } from "@material-ui/core";
import { createRoomChat } from "../redux/actions/chatAction";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import DialogHeader from "./DialogHeader";
import LinkIcon from "@material-ui/icons/Link";
// import { useSocket } from "../contexts/SocketProvider";
function FriendListMessage({
  createRoomChat,
  closeDialog,
  type,
  movieData,
  postData,
  room,
  link
}) {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [filterFollowers, setFilteredFollowers] = useState([]);
  const [filterFollowings, setFilteredFollowings] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("followers");
  // const socket = useSocket();
  const history = useHistory();
  useEffect(() => {
    axios
      .get("/api/v1/home/get-followers")
      .then((res) => {
        setFollowers(res.data);
        setFilteredFollowers(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        // console.log(e);
      });
    // return () => {
    //   setFollowers([]);
    // };
    return () => {
      document.body.style.overflowY = "auto";
    }
  }, [selectedTab]);
  useEffect(() => {
    axios
      .get("/api/v1/home/get-followings")
      .then((res) => {
        setFollowings(res.data);
        setFilteredFollowings(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        // console.log(e);
      });
    // return () => {
    //   setFollowings([]);
    // };
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [selectedTab]);
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
  const handleCreateChat = (userId) => {
    const message = link;
    createRoomChat(userId, history, closeDialog, type, movieData, postData, message);
  };
  //   const handleSendMoviePost = (userId) => {
  // if(socket !== undefined){
  //   const messageData = {
  //       roomId: roomIdParams.roomId,
  //       sender: userId,
  //       recipient: selectedUser._id,
  //       message: ,
  //       type:type,
  //       movieData:movieData
  //     };
  //   socket.emit("sendMessage");
  // }
  //   };
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
              <div
                key={user._id}
                //   onClick={() => history.push(`/@${people.userName}`)}
                className="friendListCard"
              >
                <div className="friendListCard__content__avatar">
                  <Avatar src={user.profileImageUrl} />
                  <span>{user.userName}</span>
                </div>

                <div className="peopleMatchCard__content__button">
                  <button
                    onClick={() => {
                      handleCreateChat(user._id);
                    }}
                  >
                    send
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedTab === "followings" && (
          <div className="friendListMessage__listContainer">
            {filterFollowings.map((user) => (
              <div
                key={user._id}
                //   onClick={() => history.push(`/@${people.userName}`)}
                className="friendListCard"
              >
                {" "}
                <div className="friendListCard__content__avatar">
                  <Avatar src={user.profileImageUrl} />
                  <span>{user.userName}</span>
                </div>
                <div className="peopleMatchCard__content__button">
                  <button
                    onClick={() => {
                      // if(type){
                      //   handleSendMoviePost(user._id)
                      // }else{

                      handleCreateChat(user._id);
                      // }
                    }}
                  >
                    send
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {room &&  <div className="friendListMessage__copyLink">
        <div className="friendListMessage__copyLink__container">
          <input
            id="copyText"
            type="text"
            readOnly
            value={link}
          />
          <div onClick={() => {
              var copyText = document.getElementById("copyText");
              copyText.select();
              copyText.setSelectionRange(0, 99999);
              document.execCommand("copy");
          }} className="friendListMessage__copyLink__container__copyIcon">

          <LinkIcon />
          </div>
        </div>
      </div>
    }

     </div>
  );
}

export default connect(null, { createRoomChat })(FriendListMessage);
