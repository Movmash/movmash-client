import React from "react";
import "./stylesheets/MovieRow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function MovieRow({ title }) {
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
  return (
    <div className="movieRow">
      <h1 className="movieRow__titleText">{title}</h1>
      <div className="movieRow__slider">
        <Slider {...settings}>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
          <div className="movieRow__poster">
            <img
              className="movieRow__slider--image"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362"
              alt="sasd"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default MovieRow;
