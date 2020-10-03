import React from "react";
import "./stylesheets/TicketPost.css";
import UserNamePlate from "./UserNamePlate";
import PostIconButtons from "./PostIconButtons";
function TicketPost() {
  return (
    <div className="ticketPost">
      <div className="ticketPost__container">
        <div className="ticketPost__container__header">
          <UserNamePlate
            name="Ankur Kunal"
            imageUrl="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C"
            username="i.m_ak_4.7"
            type="Hosting"
          />
        </div>
        <div className="ticketPost__container__mainContent">
          <div className="ticketPost__container__paragraph">
            <p>
              This is unlike any kind of adventure movie my eyes have ever seen
              in such a long time, the characters, the musical score for every
              scene, the story, the beauty of the landscapes of Pandora, the
              rich variety and uniqueness of the flora and fauna of Pandora, the
              ...
            </p>
          </div>
          <div className="ticketPost__container__showDetails">
            <div className="ticketPost__container__showDetails--movieDetail">
              <div className="ticketPost__container__showDetails--moviePoster">
                <img
                  src="https://lh3.googleusercontent.com/proxy/jp8n2sp1MfVoqcEWbVx9DR-nJAts7fG7R5eGqItVbsDGrCfInt-8D3tUySdhstlLhKjwIlfBZFB2zZXuX-z5G5Ky5cn_H4jHR8nP1A"
                  alt="avatar"
                ></img>
              </div>
              <div className="ticketPost__container__showDetails--movieDetails--info">
                <div className="ticketPost__container__showDetails--movieDetails--name">
                  <h3>Avatar</h3>
                </div>
                <div className="ticketPost__container__showDetails--movieDetails--year-genre">
                  <div className="ticketPost__container__showDetails--movieDetails--year">
                    <h4>2009</h4>
                  </div>
                  <div className="ticketPost__container__showDetails--movieDetails--genre">
                    <h4>Action | Sci-Fi</h4>
                  </div>
                </div>
                <div className="ticketPost__container__showDetails__movieDetails--starRatings"></div>
                <div className="ticketPost__container__showDetails__movieDetails--overview">
                  <p>
                    Jake, who is paraplegic, replaces his twin on the Na'vi
                    inhabited Pandora for a corporate mission.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="ticketPost__container__showDetails--showTiming">
              <div className="ticketPost__container__showDetails--time-range">
                <h2>16:00 to 20:00</h2>
              </div>
              <div className="ticketPost__container__showDetails--dateRange">
                <div className="ticketPost__container__showDetails--dateRange--from">
                  <div className="ticketPost__container__showDetails--dateRange-from--date">
                    <h1>13</h1>
                  </div>
                  <div className="ticketPost__container__showDetails--dateRange-from--month">
                    <h2>JUL</h2>
                  </div>
                </div>
                <h1> - </h1>
                <div className="ticketPost__container__showDetails--dateRange--to">
                  <div className="ticketPost__container__showDetails--dateRange-from--date">
                    <h1>15</h1>
                  </div>
                  <div className="ticketPost__container__showDetails--dateRange-from--month">
                    <h2>JUL</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ticketPost__container__bottomIcons">
          <PostIconButtons type="ticket" />
        </div>
      </div>
    </div>
  );
}

export default TicketPost;
