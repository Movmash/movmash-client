import React from "react";
import "./stylesheets/CommentList.css";
import CommentCard from "./CommentCard";
import { useHistory } from "react-router-dom";
function CommentList({ comments, postPage, postId }) {
  const history = useHistory();
  return (
    <div className="commentList">
      {!postPage && (
        <div className="commentList__viewFullPost">
          <p onClick={() => history.push(`/post/${postId}`)}>view full post</p>
        </div>
      )}
      {postPage ? (
        <div className="commentList__commentCard">
          {comments.map((commentDetail) => {
            return (
              <CommentCard
                key={commentDetail._id}
                commentDetail={commentDetail}
              />
            );
          })}
        </div>
      ) : (
        <div className="commentList__commentCard">
          {comments.length < 5
            ? comments.map((commentDetail) => (
                <CommentCard
                  key={commentDetail._id}
                  commentDetail={commentDetail}
                />
              ))
            : comments
                .slice(comments.length - 5, comments.length)
                .map((commentDetail) => (
                  <CommentCard
                    key={commentDetail._id}
                    commentDetail={commentDetail}
                  />
                ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
