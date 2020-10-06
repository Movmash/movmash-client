import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Slider from "react-slick";
import "./stylesheets/Movies.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { getBannerUpcomingMovies } from "../redux/actions/movieAction";
import MovieRow from "../components/MovieRow";
function Movies({ loading, getUpcomingMovies, upcomingMovies }) {
  const randomNumber = Math.floor(Math.random() * 5);
  const [unmounted, setUnmounted] = useState(false);
  useEffect(() => {
    if (!unmounted) {
      getUpcomingMovies();
    }

    return () => {
      setUnmounted(true);
    };
  }, [unmounted, getUpcomingMovies]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 1514,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const trailers = [];
  if (upcomingMovies.length !== 0) {
    for (let i = 0; i < upcomingMovies.length; i++) {
      trailers.push(upcomingMovies[i].trailers[0].key);
    }
  }
  return (
    <div className="movies">
      {!loading && upcomingMovies.length !== 0 ? (
        <>
          <Banner
            id={upcomingMovies[randomNumber].id}
            imageUrl={`
https://image.tmdb.org/t/p/original${upcomingMovies[randomNumber].backdrop_path}`}
            videoSrc={`https://www.youtube.com/watch?v=${upcomingMovies[randomNumber].trailers[0].key}?showinfo=0&enablejsapi=1&origin=http://localhost:3000/`}
          />{" "}
          <div className="movies__content">
            <div className="movies__heading">
              <h3 className="upcomingMovieText">Upcoming Movies</h3>
            </div>
            <div className="movies__slider">
              <Slider {...settings}>
                {trailers.map((trailer, id) => (
                  <div key={id} className="images">
                    <ReactPlayer
                      className="react-player"
                      controls={true}
                      url={`https://www.youtube.com/watch?v=${trailer}?showinfo=0&enablejsapi=1&origin=http://localhost:3000`}
                    />
                  </div>
                ))}{" "}
              </Slider>
            </div>

            <MovieRow title="Trending" />
            <MovieRow title="Top Rated" />
            <MovieRow title="Upcoming" />
            <MovieRow title="Action" />
            <MovieRow title="Comedy" />
            <MovieRow title="Horror" />

            <MovieRow title="Thriller" />
            <MovieRow title="Romance" />
            <MovieRow title="Adventure" />
            <MovieRow title="Drama" />
            <MovieRow title="Crime" />
            <MovieRow title="Family" />
            <MovieRow title="Fantasy" />
            <MovieRow title="Animation" />
            <MovieRow title="Sci-Fi" />
            <MovieRow title="War" />
            <MovieRow title="Documentary" />
            <MovieRow title="Music" />
            <MovieRow title="History" />
            <MovieRow title="TV Movie" />
          </div>{" "}
        </>
      ) : (
        <h1>LOADING ... </h1>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    upcomingMovies: state.movie.upcomingMovies,
    loading: state.movie.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUpcomingMovies: () => {
      dispatch(getBannerUpcomingMovies());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);

//       <div className="images">
//             <img
//               src="
// https://image.tmdb.org/t/p/original//61m8HGEWwE4q8oSz3AY5vl5F3BS.jpg"
//             ></img>
//           </div>
//           <div className="images">
//             <img
//               src="
// https://image.tmdb.org/t/p/original//61m8HGEWwE4q8oSz3AY5vl5F3BS.jpg"
//             ></img>
//           </div>
