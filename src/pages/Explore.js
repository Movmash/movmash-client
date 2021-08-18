import React, { useEffect } from "react";
import PeopleMatchList from "../components/PeopleMatchList.js";
import "./stylesheets/Explore.css";
import LeftSideBar from "../components/LeftSideBar.js";
import RightSideBar from "../components/RightSideBar.js";
import { connect } from "react-redux";
import { getExplorePost } from "../redux/actions/postAction";
import ReviewPost from "../components/ReviewPost.js";
import { BounceLoader } from "react-spinners";
import TicketPost from "../components/TicketPost.js";
import SuggestMePost from "../components/SuggestMePost.js";
import {useHistory} from "react-router-dom";
function Explore({
  getExplorePost,
  authenticated,
  loading,
  posts,
  postLoading,
  authLoading
}) {
  const history = useHistory();
  useEffect(() => {
    if (!authLoading) {
      if (authenticated) {
        getExplorePost();
      } else {
        history.push("/login");
      }
    }
  }, [authLoading, getExplorePost, authenticated, history]);
  return (
    <div className="explore">
      {" "}
      <div className="home__left--part">
        <LeftSideBar postType="explore" />
      </div>
      <div className="explore__container">
        <div className="explore__people__recommendation">
          <PeopleMatchList />
        </div>
        <div className="home__middle--part explore">
          {postLoading ? (
            <div className="home__bounceloader">
              <BounceLoader size={150} color={"#2aa44f"} loading />
            </div>
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
      </div>
      <div className="home__right--part">
        <RightSideBar />
      </div>
    </div>
  );
}
const mapStateTopProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    userId: state.user._id,
    loading: state.user.loading,
    posts: state.post.posts,
    postLoading: state.post.loading,
    authLoading: state.user.authLoading
  };
};
export default connect(mapStateTopProps, { getExplorePost })(Explore);
