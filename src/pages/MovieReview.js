import React from "react";
import "./stylesheets/MovieReview.css";
import BannerReview from "../components/BannerReview";
import MovieInfoCard from "../components/MovieInfoCard";
import MovieReviewButtons from "../components/MovieReviewButtons";
import ReviewCard from "../components/ReviewCard";
import MovieCrewList from "../components/MovieCrewList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function MovieReview() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    // responsive: [
    //   {
    //     breakpoint: 1520,
    //     settings: {
    //       slidesToShow: 5,
    //       slidesToScroll: 3,
    //       infinite: true,
    //     },
    //   },
    //   {
    //     breakpoint: 1250,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 3,
    //       //   infinite: true,
    //     },
    //   },
    //   {
    //     breakpoint: 1075,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       //   infinite: true,
    //     },
    //   },
    //   {
    //     breakpoint: 835,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 670,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  return (
    <div className="movieReview">
      {" "}
      <BannerReview
        imageUrl="https://lh6.googleusercontent.com/proxy/GtAq7UbwElIK3eMEoGGGCBSJ1lZS6wckYiMDUVKkTEpBDxNwI3_6QPGeAhbI_aUJpcSdWPx_GKUxY70=s0-d"
        videoSrc="https://www.youtube.com/watch?v=6JnN1DmbqoU"
      />
      <div className="movieReview__content">
        <div className="movieReview__content--basicInfo">
          <MovieInfoCard />
        </div>
        <div className="movieReview__content--buttons">
          <MovieReviewButtons />
        </div>
        <div className="movieReview__content--highlyRated">
          <ReviewCard />
        </div>
        <div className="movieReview__content--movieCrew">
          <MovieCrewList />
        </div>
        <div className="movieReview__content--allreview">
          <Slider {...settings}>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default MovieReview;
