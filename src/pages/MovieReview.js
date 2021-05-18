import React, { useEffect } from "react";
import "./stylesheets/MovieReview.css";
import BannerReview from "../components/BannerReview";
import MovieInfoCard from "../components/MovieInfoCard";
// import MovieReviewButtons from "../components/MovieReviewButtons";
import ReviewCard from "../components/ReviewCard";
import MovieCrewList from "../components/MovieCrewList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { connect } from "react-redux";
import { getMovieDetail } from "../redux/actions/movieAction";
import { useHistory, useLocation } from "react-router-dom";
import { MoonLoader } from "react-spinners";
function MovieReview({ movieDetails, getMovie, loading, authenticated, authLoading }) {
  const location = useLocation();
  const history = useHistory();
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
    if (!authLoading) {
      if (authenticated) {
        console.log("movie details")
        getMovie(id);
      } else {
        history.push("/login");
      }
    }
  }, [authLoading, getMovie, authenticated, history, id]);

  return (
    <div className="movieReview">
      {" "}
      {!loading && movieDetails ? (
        <>
          <BannerReview
            imageUrl={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            videoSrc={
              movieDetails.videos.results.length !== 0 &&
              movieDetails.videos.results !== undefined &&
              `https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`
            }
          />
          <div className="movieReview__content">
            <div className="movieReview__content--basicInfo">
              <MovieInfoCard
                movieStatus={movieDetails.movie_status}
                title={
                  movieDetails.title ? movieDetails.title : movieDetails.name
                }
                id={movieDetails.id}
                poster={movieDetails.poster_path}
                releaseDate={movieDetails.release_date}
                duration={movieDetails.runtime}
                genres={movieDetails.genres}
                tagline={movieDetails.tagline}
                overview={movieDetails.overview}
              />
            </div>

            {/* <div className="movieReview__content--buttons">
              <MovieReviewButtons />
            </div> */}
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
        <div className="home__bounceloader">
          <MoonLoader
            // css={override}
            size={50}
            color={"#499E4C"}
            loading
          />
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    movieDetails: state.movie.movieDetails,
    loading: state.movie.loading,
    authenticated: state.user.authenticated,
    authLoading: state.user.authLoading,
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
