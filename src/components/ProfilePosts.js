import React, { useEffect } from "react";
import "./stylesheets/ProfilePosts.css";
import ReviewPost from "./ReviewPost";
import SuggestMePost from "./SuggestMePost";
import { connect } from "react-redux";
import { getUserPost } from "../redux/actions/dataAction";
import TabLoadingData from "./TabLoadingData";
import { getMashUserPost } from "../redux/actions/dataAction";

function ProfilePosts({
  getMashUserPost,
  isMyProfile,
  getUserPost,
  profilePosts,
  infoLoading,

  userName,
}) {
  useEffect(() => {
    if (isMyProfile) {
      getUserPost();
    } else {
      getMashUserPost(userName);
    }
  }, [isMyProfile, getMashUserPost, getUserPost, userName]);
  return (
    <div className="profilePosts">
      {!infoLoading ? (
        profilePosts.length !== 0 ? (
          profilePosts.map((post) =>
            post.type === "review" ? (
              <ReviewPost
                isProfile={true}
                key={post._id}
                details={post}
                postId={post._id}
                type={post.type}
                likeCount={post.likeCount}
              />
            ) : (
              post.type === "suggestMe" && (
                <SuggestMePost
                  isProfile={true}
                  key={post._id}
                  details={post}
                  postId={post._id}
                  type={post.type}
                  likeCount={post.likeCount}
                />
              )
            )
          )
        ) : (
          <>
            {/* here two cases will form */}

            <h1>not Found</h1>
          </>
        )
      ) : (
        <TabLoadingData />
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    profilePosts: state.data.profilePosts,
    infoLoading: state.data.infoLoading,
  };
};
export default connect(mapStateToProps, { getUserPost, getMashUserPost })(
  ProfilePosts
);

// {
//           if (post.type === "review")
//             return (
//               <ReviewPost
//                 isProfile={true}
//                 key={post._id}
//                 details={post}
//                 postId={post._id}
//                 type={post.type}
//                 likeCount={post.likeCount}
//               />
//             );
//           else if (post.type === "suggestMe")
//             return (
//               <SuggestMePost
//                 isProfile={true}
//                 key={post._id}
//                 details={post}
//                 postId={post._id}
//                 type={post.type}
//                 likeCount={post.likeCount}
//               />
//             );
//         }
