import React from "react";
import "./stylesheets/Home.css";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
function Home() {
  return (
    <div className="home">
      <div className="home__left--part">
        <LeftSideBar />
      </div>

      <div className="home__middle--part">
        <div className="home__story--part"></div>

        <div className="home__feed--part"></div>
      </div>

      <div className="home__right--part">
        <RightSideBar />
      </div>
    </div>
  );
}

export default Home;
