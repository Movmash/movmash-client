import React, { useEffect, useState } from "react";
import "./stylesheets/Chat.css";
import UserNamePlate from "../components/UserNamePlate";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllRooms } from "../redux/actions/chatAction";
import ChatUserNamePlate from "../components/ChatUserNamePlate";
import ChatMessages from "../components/ChatMessages";
function Chat({ getAllRooms, rooms, userId }) {
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserName, setSelectedUserName] = useState("");
  useEffect(() => {
    getAllRooms();
  }, [getAllRooms]);

  const handleClickOnUserList = (userDetails) => {
    setSelectedUserName(userDetails.userName);
    setSelectedUser({ ...userDetails });
  };

  return (
    <div className="chat">
      <div className="chat_container">
        <div className="chat_container__left">
          <div className="chat_container__left__header">
            <h1>Messages</h1>
          </div>
          <div className="chat_container__left__userList">
            {rooms.map((room) => {
              const userDetails = room.participants.find(
                (user) => user._id !== userId
              );
              console.log(userDetails);
              return (
                <div
                  key={room._id}
                  onClick={() => {
                    handleClickOnUserList(userDetails);
                  }}
                  className={`chat_container__left__user__list ${
                    userDetails.userName === selectedUserName ? "selected" : ""
                  }`}
                >
                  <ChatUserNamePlate
                    name={userDetails.userName}
                    imageUrl={userDetails.profileImageUrl}
                    // username={`Iamak47`}
                  />
                </div>
              );
            })}
            {/* <div className="chat_container__left__user__list ">
              <UserNamePlate
                name="Ankur Kunal"
                imageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                username={`Iamak47`}
                //   type="Suggest Me"
              />
            </div> */}
          </div>
        </div>
        <div className="chat_container__right">
          {selectedUserName !== "" ? (
            <>
              {" "}
              <div className="chat_container__right__header">
                <UserNamePlate
                  name={selectedUser.userName}
                  imageUrl={selectedUser.profileImageUrl}
                  username={`Iamak47`}
                />
              </div>
              <div className="chat_container__right__messages">
                <ChatMessages />
              </div>
              <form>
                <div className="chat_container__right__input">
                  <input type="text" placeholder="send message ..."></input>
                  <button type="submit">submit</button>
                </div>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    rooms: state.chat.rooms,
    userId: state.user._id,
  };
};
export default connect(mapStateToProps, { getAllRooms })(Chat);
