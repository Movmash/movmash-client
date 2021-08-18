import React from "react";
import "./stylesheets/PostDetails.css";
import moment from "moment";
function PostDetails({
  createdAt,
  likeCount,
  commentCount,
  type,
  totalRequest,
}) {
  return (
    <div className="postDetails">
      <div className="postDetails__createdAtDetails">
        <h5>{moment(createdAt).fromNow()}</h5>
      </div>
      {type === "ticket" ? (
        <div className="postDetails__popularity--details">
          <div className="postDetails__Detail">
            <h5>{totalRequest} requests</h5>
          </div>
        </div>
      ) : (
        <div className="postDetails__popularity--details">
          <div className="postDetails__Detail">
            <h5>{likeCount} likes</h5>
          </div>
          <div className="postDetails__Detail">
            <h5> • {commentCount} comments </h5>
          </div>
          {/* <div className="postDetails__Detail">
          <h5>{" • 12 shares"}</h5>
        </div> */}
        </div>
      )}
    </div>
  );
}

export default PostDetails;
