import React , {useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import MyProfile from "../components/MyProfile";
import UserProfile from "../components/UserProfile";
import {} from "react-router-dom";
function Profile({ user }) {
  const { userName } = useParams();
  const myUserName = user.userName;
  const history = useHistory();
  useEffect(() => {
    if (!user.authLoading) {
      if (!user.authenticated) {
        history.push("/login");
      }
    }
  }, [user.authLoading, history, user.authenticated]);
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
