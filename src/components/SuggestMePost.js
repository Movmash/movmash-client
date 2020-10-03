import React from "react";
import UserNamePlate from "./UserNamePlate";
import "./stylesheets/SuggestMePost.css";
import PostIconButtons from "./PostIconButtons";
function SuggestMePost() {
  return (
    <div className="suggestMePost">
      <div className="suggestMePost__container">
        <div className="suggestMePost__container__heading">
          <UserNamePlate
            name="Ankur Kunal"
            imageUrl="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C"
            username="i.m_ak_4.7"
            type="Suggest Me"
          />
        </div>
        <div className="suggestMePost__container__mainContent">
          <div className="suggestMePost__container__paragraph">
            <p>
              This is unlike any kind of adventure movie my eyes have ever seen
              in such a long time, the characters, the musical score for every
              scene, the story, the beauty of the landscapes of Pandora, the
              rich variety and uniqueness of the flora and fauna of Pandora, the
              ...
            </p>
          </div>
          <div className="suggestMePost__container__suggestionDetailes">
            <div className="suggestMePost__container__suggestionDetailes--rating">
              <div className="suggestMePost__container__suggestionDetailes--rating--heading">
                <h4>Rating Above</h4>
              </div>
              <div className="suggestMePost__container__suggestionDetailes--rating--content">
                <h1>7.1</h1>
              </div>
            </div>
            <div className="suggestMePost__container__suggestionDetailes--genre-language-duration">
              <div className="suggestMePost__container__suggestionDetailes--genre">
                <div className="suggestMePost__container__suggestionDetailes--genre--subcontainer">
                  <div className="suggestMePost__container__suggestionDetailes--genre--heading">
                    <h3>Genre</h3>
                  </div>
                  <div className="suggestMePost__container__suggestionDetailes--genre--content">
                    <h3>Scf-Fi | Action | Thriller</h3>
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
                      <h3>English | Hindi</h3>
                    </div>
                  </div>
                </div>
                <div className="suggestMePost__container__suggestionDetailes--duration">
                  <div className="suggestMePost__container__suggestionDetailes--duration--heading">
                    <h3>Duration</h3>
                  </div>
                  <div className="suggestMePost__container__suggestionDetailes--duration--content">
                    <h3>90m-100m</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="SuggestMePost__container__bottomIcon">
          <PostIconButtons type="suggestMe" />
        </div>
      </div>{" "}
    </div>
  );
}

export default SuggestMePost;
