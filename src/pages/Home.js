import React from "react";
import "./stylesheets/Home.css";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import ReviewPost from "../components/ReviewPost";
import SuggestMePost from "../components/SuggestMePost";
import TicketPost from "../components/TicketPost";
import { connect } from "react-redux";
import Login from "./Login";
function Home({ authenticated, loading }) {
  console.log(authenticated);

  return (
    <>
      (
      {!loading ? (
        authenticated ? (
          <div className="home">
            <div className="home__left--part">
              <LeftSideBar />
            </div>

            <div className="home__middle--part">
              <div className="home__story--part"></div>

              <div className="home__feed--part">
                <ReviewPost />
                <SuggestMePost />
                <TicketPost />
              </div>
            </div>

            <div className="home__right--part">
              <RightSideBar />
            </div>
          </div>
        ) : (
          <Login />
        )
      ) : (
        <>
          <h1>loading ....</h1>
        </>
      )}
    </>
  );
}
const mapStateTopProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    loading: state.user.loading,
  };
};
export default connect(mapStateTopProps)(Home);
