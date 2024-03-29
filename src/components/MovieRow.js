import React, { useState, useEffect } from "react";
import "./stylesheets/MovieRow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "../util/axios";
// import { connect } from "react-redux";
// import { getMovieDetail } from "../redux/actions/movieAction";
// import { useHistory } from "react-router-dom";
import MoviePoster from "./MoviePoster";
// import { Link } from "react-router-dom";
function MovieRow({ title }) {
  const [movies, setMovies] = useState([]);
  const [loading, isLoading] = useState(true);
  // const history = useHistory();
  useEffect(() => {
    axios
      .get(`/api/v1/movie/genre/${title}/1`)
      .then((res) => {
        setMovies(res.data.results);
        isLoading(false);
        return res;
      })
      .catch((e) => {
        isLoading(true);
        console.log(e);
      });
  }, [title]);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1520,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          //   infinite: true,
        },
      },
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          //   infinite: true,
        },
      },
      {
        breakpoint: 835,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const clickHandler = (id) => {
  //   history.push(`/movie/${id}`);
  //   getMovieDetail(id);
  // };

  return (
    <div className="movieRow">
      {!loading ? (
        <>
          <h1 className="movieRow__titleText">{title}</h1>
          <div className="movieRow__slider">
            <Slider {...settings}>
              {movies.map((movie) => (
                <div key={movie.id} className="movieRow__poster">
                  {/* <Link to={`/movie/${movie.id}`}> */}
                  <MoviePoster
                    detail={movie}
                    id={movie.id}
                    posterUrl={movie.poster_path}
                  />

                  {/* <img
                    onClick={() => {
                      clickHandler(movie.id);
                    }}
                    className="movieRow__slider--image"
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt="sasd"
                  /> */}
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : (
        <h1>loading ... </h1>
      )}
    </div>
  );
}
// const mapDispatchTopProps = (dispatch) => {
//   return {
//     getMovieDetail: (movieId) => {
//       dispatch(getMovieDetail(movieId));
//     },
//   };
// };
export default MovieRow;
