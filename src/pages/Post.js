import React, { useEffect } from 'react'
import {useHistory, useParams} from "react-router-dom";
import "./stylesheets/Post.css";
import {connect} from "react-redux";
import {getPostDetail} from "../redux/actions/postAction"
import { MoonLoader } from 'react-spinners';
import SuggestMePost from '../components/SuggestMePost';
import ReviewPost from '../components/ReviewPost';
function Post({
  getPostDetail,
  authLoading,
  authenticated,
  loading,
  validPost,
  post,
}) {
  const history = useHistory();
  const { postId } = useParams();
  useEffect(() => {
    if (!authLoading) {
      if (authenticated) {
        getPostDetail(postId);
      } else {
        history.push("/login");
      }
    }
  }, [authLoading, authenticated, getPostDetail, history, postId]);
  return (
    <div className="post">
      <div className="post__container">
        {loading ? (
          <div className="home__bounceloader">
            <MoonLoader
              // css={override}
              size={40}
              color={"#2aa44f"}
              loading
            />
          </div>
        ) : validPost || post !== "ticket" ? (
          <div className="post__content">
            {post.type === "review" && (
              <ReviewPost
                details={post}
                postId={post._id}
                type={post.type}
                likeCount={post.likeCount}
                postPage={true}
              />
            )}
            {post.type === "suggestMe" && (
              <SuggestMePost
                key={post._id}
                details={post}
                postId={post._id}
                type={post.type}
                likeCount={post.likeCount}
                postPage={true}
              />
            )}
          </div>
        ) : (
          <div>Post Not Found</div>
        )}
      </div>
    </div>
  );
}

const mapStateTopProps = (state) => {
    return {
      post: state.post.post,
      loading: state.post.loading,
      authLoading: state.user.authLoading,
      authenticated: state.user.authenticated,
      validPost: state.user.validPost,
    };
}

export default connect(mapStateTopProps, { getPostDetail })(Post);
