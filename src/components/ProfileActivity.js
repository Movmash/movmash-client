import React, { useEffect } from "react";
import "./stylesheets/ProfileActivity.css";
import TabDescriptionInfo from "./TabDescriptionInfo";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  getMashUserLikeDislike,
  getUserLikeDislike,
  resetState,
  undoDislikeMovies,
  unlikeMovies,
} from "../redux/actions/dataAction";
import LocalActivityTwoToneIcon from "@material-ui/icons/LocalActivityTwoTone";
import TabLoadingData from "./TabLoadingData";
import stringLimiter from "../util/stringLimiter";
function ProfileActivity({
  isMyProfile,
  getMashUserLikeDislike,
  getUserLikeDislike,
  resetState,
  userName,
  likedMovies,
  dislikedMovies,
  activityLoading,
  undoDislikeMovies,
  unlikeMovies,
}) {
  useEffect(() => {
    if (isMyProfile) {
      getUserLikeDislike();
    } else {
      getMashUserLikeDislike(userName);
    }
    return () => {
      resetState();
    };
  }, [
    getUserLikeDislike,
    isMyProfile,
    getMashUserLikeDislike,
    userName,
    resetState,
  ]);

  const handleUnlike = (id) => {
    unlikeMovies(id);
  };

  const handleUndoDislike = (id) => {
    undoDislikeMovies(id);
  };

  return (
    <div>
      {/* */}
      {activityLoading ? (
        <TabLoadingData />
      ) : likedMovies.length !== 0 || dislikedMovies.length !== 0 ? (
        <>
          {likedMovies.length !== 0 && (
            <div className="watchlist__container">
              <h2>Likes</h2>
              <div className="watchlist__movieContent">
                {likedMovies.map((list) => (
                  <div className="watchlist__movieItem">
                    <div className="watchlist__moviePoster">
                      {list.moviePoster !== null ? (
                        <div className="watchlist__posterWrapper">
                          <img
                            src={`https://image.tmdb.org/t/p/w185${list.moviePoster}`}
                            alt={list.movieTitle}
                          />
                        </div>
                      ) : (
                        <div className="watchlist__posterWrapper">
                          {" "}
                          <img
                            src="https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                            alt={list.movieTitle}
                          />
                        </div>
                      )}
                    </div>
                    <div className="watchlist__moviePoster__skin"></div>
                    {isMyProfile && (
                      <div
                        onClick={() => {
                          handleUnlike(list.movieId);
                        }}
                        className="watchlist__moviePoster__button"
                      >
                        <CloseIcon />
                      </div>
                    )}
                    <div className="moviePoster__detailCard__title profileWatchList">
                      <span>
                        {" "}
                        {stringLimiter(
                          list.movieTitle ? list.movieTitle : list.name,
                          15
                        )}
                      </span>

                      <span> ({list.releaseDate.split("-")[0]})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}{" "}
          {dislikedMovies.length !== 0 && (
            <div className="watchlist__container">
              <h2>Dislikes</h2>
              <div className="watchlist__movieContent">
                {dislikedMovies.map((list) => (
                  <div className="watchlist__movieItem">
                    <div className="watchlist__moviePoster">
                      {list.moviePoster !== null ? (
                        <div className="watchlist__posterWrapper">
                          <img
                            src={`https://image.tmdb.org/t/p/w185${list.moviePoster}`}
                            alt={list.movieTitle}
                          />
                        </div>
                      ) : (
                        <div className="watchlist__posterWrapper">
                          {" "}
                          <img
                            src="https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                            alt={list.movieTitle}
                          />
                        </div>
                      )}
                    </div>
                    <div className="watchlist__moviePoster__skin"></div>
                    {isMyProfile && (
                      <div
                        onClick={() => {
                          handleUndoDislike(list.movieId);
                        }}
                        className="watchlist__moviePoster__button"
                      >
                        <CloseIcon />
                      </div>
                    )}
                    <div className="moviePoster__detailCard__title profileWatchList">
                      <span>
                        {" "}
                        {stringLimiter(
                          list.movieTitle ? list.movieTitle : list.name,
                          15
                        )}
                      </span>

                      <span> ({list.releaseDate.split("-")[0]})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <TabDescriptionInfo
          Icon={LocalActivityTwoToneIcon}
          info={
            isMyProfile
              ? "Your all like dislike of movies will be shown here"
              : "No Activity available"
          }
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    likedMovies: state.data.profileActivity.likedMovies,
    dislikedMovies: state.data.profileActivity.dislikedMovies,
    activityLoading: state.data.infoActivityLoading,
  };
};

export default connect(mapStateToProps, {
  getMashUserLikeDislike,
  getUserLikeDislike,
  resetState,
  undoDislikeMovies,
  unlikeMovies,
})(ProfileActivity);
