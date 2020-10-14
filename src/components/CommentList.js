import React from "react";
import "./stylesheets/CommentList.css";
import CommentCard from "./CommentCard";
function CommentList({ comments }) {
  return (
    <div className="commentList">
      <div className="commentList__viewFullPost">
        <p>view full post</p>
      </div>
      <div className="commentList__commentCard">
        {comments
          .slice(comments.length - 5, comments.length)
          .map((commentDetail) => {
            return (
              <CommentCard
                key={commentDetail._id}
                commentDetail={commentDetail}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CommentList;
