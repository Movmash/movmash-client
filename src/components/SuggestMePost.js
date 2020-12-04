import React, { useState } from "react";
import UserNamePlate from "./UserNamePlate";
import "./stylesheets/SuggestMePost.css";
import PostIconButtons from "./PostIconButtons";
import PostDetails from "./PostDetails";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
function SuggestMePost({ isProfile, details, type, postId }) {
  const {
    duration,
    genreName,
    postedBy,
    rating,
    language,
    createdAt,
    likeCount,
    commentCount,
    likes,
    comments,
  } = details;
  const [likeCountShown, setLikeCountShown] = useState(likeCount);
  const [openSearchMovie, setSearchMovie] = useState(false);
  // console.log(openSearchMovie);
  return (
    <div className="suggestMePost">
      <div className="suggestMePost__container">
        <div className="suggestMePost__container__heading">
          <UserNamePlate
            name="Ankur Kunal"
            imageUrl={postedBy.profileImageUrl}
            username={`@${postedBy.userName}`}
            type="Suggest Me"
          />
        </div>
        <div className="suggestMePost__container__mainContent">
          {/* <div className="suggestMePost__container__paragraph">
            <p>
              This is unlike any kind of adventure movie my eyes have ever seen
              in such a long time, the characters, the musical score for every
              scene, the story, the beauty of the landscapes of Pandora, the
              rich variety and uniqueness of the flora and fauna of Pandora, the
              ...
            </p>
          </div> */}
          <div className="suggestMePost__container__suggestionDetailes">
            <div className="suggestMePost__container__suggestionDetailes--rating">
              <div className="suggestMePost__container__suggestionDetailes--rating--heading">
                <h4>Rating Above</h4>
              </div>
              <div className="suggestMePost__container__suggestionDetailes--rating--content">
                <h1>{rating}</h1>
              </div>
            </div>
            <div className="suggestMePost__container__suggestionDetailes--genre-language-duration">
              <div className="suggestMePost__container__suggestionDetailes--genre">
                <div className="suggestMePost__container__suggestionDetailes--genre--subcontainer">
                  <div className="suggestMePost__container__suggestionDetailes--genre--heading">
                    <h3>Genre</h3>
                  </div>
                  <div className="suggestMePost__container__suggestionDetailes--genre--content">
                    <h3>{genreName.join(" | ")}</h3>
                  </div>
                </div>
              </div>
              <div className="suggestMePost__container__suggestionDetailes--language-duration">
                <div className="suggestMePost__container__suggestionDetailes--language">
                  <div className="suggestMePost__container__suggestionDetailes--language--subcontainer">
                    <div className="suggestMePost__container__suggestionDetailes--language--heading">
                      <h3>Language</h3>
                    </div>
                    <div className="suggestMePost__container__suggestionDetailes--language--content">
                      <h3>{language}</h3>
                    </div>
                  </div>
                </div>
                <div className="suggestMePost__container__suggestionDetailes--duration">
                  <div className="suggestMePost__container__suggestionDetailes--duration--heading">
                    <h3>Duration</h3>
                  </div>
                  <div className="suggestMePost__container__suggestionDetailes--duration--content">
                    <h3>{duration}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviewPost__postDetails">
          <PostDetails
            createdAt={createdAt}
            likeCount={likeCountShown}
            commentCount={commentCount}
          />
        </div>
        <div className="SuggestMePost__container__bottomIcon">
          <PostIconButtons
            tag={isProfile}
            postId={postId}
            type="suggestMe"
            setSearchMovie={setSearchMovie}
            likes={likes}
            details={details}
            setLikeCountShown={setLikeCountShown}
          />
        </div>
        <div className="suggestMePost__commentList">
          <CommentList comments={comments} />
        </div>
        <div className="commentForm">
          <CommentForm
            tag={isProfile}
            postId={postId}
            type={type}
            openSearchMovie={openSearchMovie}
          />
        </div>
      </div>
    </div>
  );
}

export default SuggestMePost;
