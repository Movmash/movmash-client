import React from "react";
import "./stylesheets/Home.css";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import ReviewPost from "../components/ReviewPost";
import SuggestMePost from "../components/SuggestMePost";
import TicketPost from "../components/TicketPost";
function Home() {
  return (
    <div className="home">
      <div className="home__left--part">
        <LeftSideBar />
      </div>

      <div className="home__middle--part">
        <div className="home__story--part"></div>

        <div className="home__feed--part">
          <ReviewPost />
          <SuggestMePost />
          <TicketPost />
        </div>
      </div>

      <div className="home__right--part">
        <RightSideBar />
      </div>
    </div>
  );
}

export default Home;
