import React from "react";
import "./stylesheets/PeopleMatchList.css";
import PeopleMatchCard from "./PeopleMatchCard";
import Slider from "react-slick";

function PeopleMatchList() {
  const settings = {
    infinite: true,
    // speed: 500,
    // slidesToShow: 6,
    // slidesToScroll: 4,
    // initialSlide: 0,
  };
  return (
    <div className="peopleMatchList">
      <Slider {...settings}>
        <PeopleMatchCard />
        <PeopleMatchCard />
        <PeopleMatchCard />
        <PeopleMatchCard />
        <PeopleMatchCard />
        <PeopleMatchCard />
        <PeopleMatchCard />
      </Slider>
    </div>
  );
}

export default PeopleMatchList;
