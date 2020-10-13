import React from "react";
import "./stylesheets/TicketPost.css";
import UserNamePlate from "./UserNamePlate";
import PostIconButtons from "./PostIconButtons";
import urls from "../util/urls";
import { genreConverter } from "../util/genreConverter";
import getTimeDetails from "../util/getTimeDetails";
import stringLimiter from "../util/stringLimiter";
import PostDetails from "./PostDetails";
function TicketPost({ details, postId }) {
  const {
    description,
    genreId,
    moviePoster,
    movieTitle,
    postedBy,
    releaseYear,
    showTimeFrom,
    showTimeTo,
    overview,
    createdAt,
    likeCount,
    commentCount,
    likes,
  } = details;

  return (
    <div className="ticketPost">
      <div className="ticketPost__container">
        <div className="ticketPost__container__header">
          <UserNamePlate
            name="Ankur Kunal"
            imageUrl={postedBy.profileImageUrl}
            username={postedBy.userName}
            type="Hosting"
          />
        </div>
        <div className="ticketPost__container__mainContent">
          <div className="ticketPost__container__paragraph">
            <p>{description}</p>
          </div>
          <div className="ticketPost__container__showDetails">
            <div className="ticketPost__container__showDetails--movieDetail">
              <div className="ticketPost__container__showDetails--moviePoster">
                <img
                  src={
                    moviePoster !== null
                      ? `${urls.movieBaseUrl}w154${moviePoster}`
                      : urls.movieNoPoster
                  }
                  alt={movieTitle}
                ></img>
              </div>
              <div className="ticketPost__container__showDetails--movieDetails--info">
                <div className="ticketPost__container__showDetails--movieDetails--name">
                  <h3>{movieTitle}</h3>
                </div>
                <div className="ticketPost__container__showDetails--movieDetails--year-genre">
                  <div className="ticketPost__container__showDetails--movieDetails--year">
                    <h4>{releaseYear}</h4>
                  </div>
                  <div className="ticketPost__container__showDetails--movieDetails--genre">
                    <h4>{genreConverter(genreId)}</h4>
                  </div>
                </div>
                <div className="ticketPost__container__showDetails__movieDetails--starRatings"></div>

                <div className="ticketPost__container__showDetails__movieDetails--overview">
                  <p>{stringLimiter(overview, 80)}</p>
                </div>
              </div>
            </div>
            <div className="ticketPost__container__showDetails--showTiming">
              <div className="ticketPost__container__showDetails--time-range">
                <h2>
                  {`${getTimeDetails(showTimeFrom, "h")}:${getTimeDetails(
                    showTimeFrom,
                    "min"
                  )}`}{" "}
                  to{" "}
                  {`${getTimeDetails(showTimeFrom, "h")}:${getTimeDetails(
                    showTimeFrom,
                    "min"
                  )}`}
                </h2>
              </div>
              <div className="ticketPost__container__showDetails--dateRange">
                <div className="ticketPost__container__showDetails--dateRange--from">
                  <div className="ticketPost__container__showDetails--dateRange-from--date">
                    <h1>{`${getTimeDetails(showTimeFrom, "d")}`}</h1>
                  </div>
                  <div className="ticketPost__container__showDetails--dateRange-from--month">
                    <h2>{`${getTimeDetails(showTimeFrom, "m")}`}</h2>
                  </div>
                </div>
                <h1> - </h1>
                <div className="ticketPost__container__showDetails--dateRange--to">
                  <div className="ticketPost__container__showDetails--dateRange-from--date">
                    <h1>{`${getTimeDetails(showTimeTo, "d")}`}</h1>
                  </div>
                  <div className="ticketPost__container__showDetails--dateRange-from--month">
                    <h2>{`${getTimeDetails(showTimeTo, "m")}`}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviewPost__postDetails">
          <PostDetails
            createdAt={createdAt}
            likeCount={likeCount}
            commentCount={commentCount}
          />
        </div>
        <div className="ticketPost__container__bottomIcons">
          <PostIconButtons likes={likes} type="ticket" />
        </div>
      </div>
    </div>
  );
}

export default TicketPost;
