import React from "react";
import "./stylesheets/ReviewPost.css";
import PostIconButtons from "./PostIconButtons";
import UserNamePlate from "./UserNamePlate";
function ReviewPost() {
  return (
    <div className="reviewPost">
      <div className="reviewPost__container">
        <div className="reviewPost__header">
          <UserNamePlate
            imageUrl="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C"
            type="Review"
            name="Ankur Kunal"
            username="i.m_ak_4.7"
          />
        </div>
        <div className="reviewPost__mainPost">
          <div className="reviewPost__contentPoster">
            <img
              alt="avatar"
              src="https://lh3.googleusercontent.com/proxy/jp8n2sp1MfVoqcEWbVx9DR-nJAts7fG7R5eGqItVbsDGrCfInt-8D3tUySdhstlLhKjwIlfBZFB2zZXuX-z5G5Ky5cn_H4jHR8nP1A"
            />
          </div>
          <div className="reviewPost__contentInfo">
            <div className="reviewPost__contentInfo--heading">
              <div className="reviewPost__contentInfo--heading--movieName">
                <h2>Avatar</h2>
              </div>
              <div className="reviewPost__contentInfo--heading--ReleaseYear">
                <h3>(2009)</h3>
              </div>
            </div>
            <div className="reviewPost__contentInfo--durationGenre">
              <div className="reviewPost__contentInfo--durationGenre--duration">
                <h4>162 m</h4>
              </div>
              <div className="reviewPost__contentInfo--durationGenre--genre">
                <h4>Action | Sci-Fi</h4>
              </div>
            </div>
            <div className="reviewPost__contentInfo--starRating"></div>
            <div className="reviewPost__contentInfo--numericRating">
              <div className="reviewPost__contentInfo--numericRating--rateValue">
                <h2>4.2</h2>
              </div>
              <div className="reviewPost__contentInfo--numericRating--outOff">
                <h3>/ 5</h3>
              </div>
            </div>
            <div className="reviewPost__contentInfo--reviewContent">
              <p>
                This is unlike any kind of adventure movie my eyes have ever
                seen in such a long time, the characters, the musical score for
                every scene, the story, the beauty of the landscapes of Pandora,
                the rich variety and uniqueness of the flora and fauna of
                Pandora, the ...
              </p>
            </div>
          </div>
        </div>
        <div className="reviewPost__bottomIcons">
          <PostIconButtons type="review" />
        </div>
      </div>
    </div>
  );
}

export default ReviewPost;
