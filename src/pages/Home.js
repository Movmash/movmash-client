import React, { useEffect } from "react";
import "./stylesheets/Home.css";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import ReviewPost from "../components/ReviewPost";
import SuggestMePost from "../components/SuggestMePost";
import TicketPost from "../components/TicketPost";
import { connect } from "react-redux";
// import Login from "./Login";
import { getSubcriberPost, resetPost } from "../redux/actions/postAction";
import { HashLoader } from "react-spinners";
import {useHistory} from "react-router-dom"
import HomeSkeleton from "../loadingSkeletons/HomeSkeleton";
function Home({
  authenticated,
  loading,
  getSubcriberPost,
  posts,
  postLoading,
  userId,
  authLoading,
  resetPost,
}) {
  const history = useHistory();
  useEffect(() => {
    if (!authLoading) {
      if (authenticated) {
        getSubcriberPost();
      } else {
        history.push("/login");
      }
    }
    return () => {
      resetPost();
    };
  }, [authLoading, authenticated, getSubcriberPost, history, resetPost]);

  return (
    <>
      {!loading ? (
        <div className="home">
          <div className="home__left--part">
            <LeftSideBar postType="home" />
          </div>

          <div className="home__middle--part">
            <div className="home__story--part"></div>
            {postLoading ? (
              <HomeSkeleton />
            ) : (
              <div className="home__feed--part">
                {posts.map((post) => {
                  if (post.type === "review")
                    return (
                      <ReviewPost
                        key={post._id}
                        details={post}
                        postId={post._id}
                        type={post.type}
                        likeCount={post.likeCount}
                      />
                    );
                  else if (post.type === "ticket")
                    return (
                      <TicketPost
                        key={post._id}
                        details={post}
                        postId={post._id}
                        type={post.type}
                        likeCount={post.likeCount}
                      />
                    );
                  else if (post.type === "suggestMe")
                    return (
                      <SuggestMePost
                        key={post._id}
                        details={post}
                        postId={post._id}
                        type={post.type}
                        likeCount={post.likeCount}
                      />
                    );
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
        <div className="home__bounceloader">
          <HashLoader size={150} color={"#2aa44f"} loading />
        </div>
      )}
    </>
  );
}
const mapStateTopProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    userId: state.user._id,
    loading: state.user.loading,
    posts: state.post.posts,
    postLoading: state.post.loading,
    authLoading: state.user.authLoading,
  };
};
export default connect(mapStateTopProps, { getSubcriberPost, resetPost })(Home);
