import React, { useEffect } from "react";
import "./stylesheets/Home.css";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import ReviewPost from "../components/ReviewPost";
import SuggestMePost from "../components/SuggestMePost";
import TicketPost from "../components/TicketPost";
import { connect } from "react-redux";
import Login from "./Login";
import { getSubcriberPost } from "../redux/actions/postAction";
import { BounceLoader } from "react-spinners";
function Home({
  authenticated,
  loading,
  getSubcriberPost,
  posts,
  postLoading,
}) {
  useEffect(() => {
    if (authenticated) {
      getSubcriberPost();
    }
    return;
  }, [authenticated, getSubcriberPost]);
  return (
    <>
      {!loading ? (
        authenticated ? (
          <div className="home">
            <div className="home__left--part">
              <LeftSideBar />
            </div>

            <div className="home__middle--part">
              <div className="home__story--part"></div>
              {postLoading ? (
                <div className="home__bounceloader">
                  <BounceLoader size={150} color={"#2aa44f"} loading />
                </div>
              ) : (
                <div className="home__feed--part">
                  {posts.map((post) => {
                    if (post.type === "review")
                      return <ReviewPost key={post._id} details={post} />;
                    else if (post.type === "ticket")
                      return <TicketPost key={post._id} details={post} />;
                    else if (post.type === "suggestMe")
                      return <SuggestMePost key={post._id} details={post} />;
                    else {
                      console.log(post.type);
                      return null;
                    }
                  })}
                </div>
              )}
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
    posts: state.post.posts,
    postLoading: state.post.loading,
  };
};
export default connect(mapStateTopProps, { getSubcriberPost })(Home);
