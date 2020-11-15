import React, { useEffect } from "react";
import "./stylesheets/ProfilePosts.css";
import ReviewPost from "./ReviewPost";
import SuggestMePost from "./SuggestMePost";
import { connect } from "react-redux";
import { getUserPost, resetState } from "../redux/actions/dataAction";
import TabLoadingData from "./TabLoadingData";
import { getMashUserPost } from "../redux/actions/dataAction";
import TabDescriptionInfo from "./TabDescriptionInfo";
import ViewCompactTwoToneIcon from "@material-ui/icons/ViewCompactTwoTone";

function ProfilePosts({
  getMashUserPost,
  isMyProfile,
  getUserPost,
  profilePosts,
  infoLoading,
  resetState,
  userName,
}) {
  useEffect(() => {
    if (isMyProfile) {
      getUserPost();
    } else {
      getMashUserPost(userName);
      console.log(userName);
    }
    return () => {
      resetState();
    };
  }, [isMyProfile, getMashUserPost, getUserPost, userName, resetState]);
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
          <TabDescriptionInfo
            info={isMyProfile ? "You don't have any post" : "No post available"}
            Icon={ViewCompactTwoToneIcon}
          />
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
export default connect(mapStateToProps, {
  getUserPost,
  getMashUserPost,
  resetState,
})(ProfilePosts);

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
