import React, { useEffect, useState } from "react";
import "./stylesheets/MovieReview.css";
import BannerReview from "../components/BannerReview";
import MovieInfoCard from "../components/MovieInfoCard";
import MovieReviewButtons from "../components/MovieReviewButtons";
import ReviewCard from "../components/ReviewCard";
import MovieCrewList from "../components/MovieCrewList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { connect } from "react-redux";
import { getMovieDetail } from "../redux/actions/movieAction";
import { useLocation } from "react-router-dom";
function MovieReview({ movieDetails, getMovie, loading }) {
  const location = useLocation();
  const [unmounted, setUnmounted] = useState(false);
  const id = location.pathname.split("/")[
    location.pathname.split("/").length - 1
  ];
  console.log(id);
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
  useEffect(() => {
    if (!unmounted) {
      getMovie(id);
    }

    return () => {
      setUnmounted(true);
    };
  }, [unmounted, id, getMovie]);
  console.log(movieDetails);

  return (
    <div className="movieReview">
      {" "}
      {!loading && movieDetails ? (
        <>
          <BannerReview
            imageUrl={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            videoSrc={
              movieDetails.videos.results.length !== 0 &&
              `https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`
            }
          />
          <div className="movieReview__content">
            <div className="movieReview__content--basicInfo">
              <MovieInfoCard
                title={
                  movieDetails.title ? movieDetails.title : movieDetails.name
                }
                poster={movieDetails.poster_path}
                releaseDate={movieDetails.release_date}
                duration={movieDetails.runtime}
                genres={movieDetails.genres}
                tagline={movieDetails.tagline}
                overview={movieDetails.overview}
              />
            </div>
            <div className="movieReview__content--buttons">
              <MovieReviewButtons />
            </div>
            <div className="movieReview__content--highlyRated">
              <ReviewCard />
            </div>
            <div className="movieReview__content--movieCrew">
              <MovieCrewList casts={movieDetails.credits.cast} />
            </div>
            <div className="movieReview__content--allreview">
              <Slider {...settings}>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
              </Slider>
            </div>
          </div>
        </>
      ) : (
        <h1>loading....</h1>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    movieDetails: state.movie.movieDetails,
    loading: state.movie.loading,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    getMovie: (movieId) => {
      dispatch(getMovieDetail(movieId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchTopProps)(MovieReview);
