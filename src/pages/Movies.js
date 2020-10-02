import React from "react";
import Banner from "../components/Banner";
import Slider from "react-slick";
import "./stylesheets/Movies.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";
import MovieRow from "../components/MovieRow";
function Movies() {
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
  return (
    <div className="movies">
      <Banner
        imageUrl="
https://image.tmdb.org/t/p/original//61m8HGEWwE4q8oSz3AY5vl5F3BS.jpg"
        videoSrc="https://www.youtube.com/watch?v=qZhb0Vl_BaM?showinfo=0&enablejsapi=1&origin=http://localhost:3000"
      />{" "}
      <div className="movies__content">
        <div className="movies__heading">
          <h3 className="upcomingMovieText">Upcoming Movies</h3>
        </div>
        <div className="movies__slider">
          <Slider {...settings}>
            <div className="images">
              <ReactPlayer
                className="react-player"
                controls={true}
                url="https://www.youtube.com/watch?v=qZhb0Vl_BaM?showinfo=0&enablejsapi=1&origin=http://localhost:3000"
              />
            </div>{" "}
            <div className="images">
              <ReactPlayer
                className="react-player"
                controls={true}
                url="https://www.youtube.com/watch?v=qZhb0Vl_BaM?showinfo=0&enablejsapi=1&origin=http://localhost:3000"
              />
            </div>{" "}
            <div className="images">
              <ReactPlayer
                className="react-player"
                controls={true}
                url="https://www.youtube.com/watch?v=qZhb0Vl_BaM?showinfo=0&enablejsapi=1&origin=http://localhost:3000"
              />
            </div>{" "}
            <div className="images">
              <ReactPlayer
                className="react-player"
                controls={true}
                url="https://www.youtube.com/watch?v=qZhb0Vl_BaM?showinfo=0&enablejsapi=1&origin=http://localhost:3000"
              />
            </div>
            <div className="images">
              <ReactPlayer
                className="react-player"
                controls={true}
                url="https://www.youtube.com/watch?v=qZhb0Vl_BaM?showinfo=0&enablejsapi=1&origin=http://localhost:3000"
              />
            </div>
          </Slider>
        </div>

        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
        <MovieRow title="Horror" data="data" />
      </div>
    </div>
  );
}

export default Movies;

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
