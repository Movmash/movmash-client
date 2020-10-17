import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import MyProfile from "../components/MyProfile";
import UserProfile from "../components/UserProfile";
function Profile({ user }) {
  const { userName } = useParams();
  const myUserName = user.userName;

  return (
    <div>
      {userName === myUserName ? (
        <MyProfile {...user} />
      ) : (
        <UserProfile userName={userName} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
