import React, { useEffect } from "react";
import "./stylesheets/ProfileWatchlist.css";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import TabDescriptionInfo from "./TabDescriptionInfo";
import { connect } from "react-redux";
import {
  getMashUserWatchList,
  getUserWatchList,
  resetState,
  deleteFromWatchList,
} from "../redux/actions/dataAction";
import TabLoadingData from "./TabLoadingData";
import stringLimiter from "../util/stringLimiter";
function ProfileWatchlist({
  isMyProfile,
  userName,
  getMashUserWatchList,
  getUserWatchList,
  watchlists,
  watchlistLoading,
  resetState,
  deleteFromWatchList,
}) {
  useEffect(() => {
    if (isMyProfile) {
      getUserWatchList();
    } else {
      getMashUserWatchList(userName);
    }
    return () => {
      resetState();
    };
  }, [
    isMyProfile,
    getMashUserWatchList,
    getUserWatchList,
    userName,
    resetState,
  ]);
  const handleRemoveFromWatchList = (id) => {
    deleteFromWatchList(id);
  };
  return (
    <div className="watchlist">
      {watchlistLoading ? (
        <TabLoadingData />
      ) : watchlists.length !== 0 ? (
        <div className="watchlist__container">
          <h2>Watchlist</h2>
          <div className="watchlist__movieContent">
            {watchlists.map((list) => (
              <div key={list._id} className="watchlist__movieItem">
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
                      handleRemoveFromWatchList(list.movieId);
                    }}
                    className="watchlist__moviePoster__button"
                  >
                    <CloseIcon />
                  </div>
                )}
                <div className="moviePoster__detailCard__title profileWatchList">
                  <span>
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
      ) : (
        <TabDescriptionInfo
          info={
            isMyProfile
              ? "Save the movie which you wanted to watch. People can see this and can send you the request"
              : "No Watchlist available"
          }
          Icon={BookmarkTwoToneIcon}
        />
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    watchlists: state.data.profileWatchLists,
    watchlistLoading: state.data.infoWatchListLoading,
  };
};
export default connect(mapStateToProps, {
  getMashUserWatchList,
  getUserWatchList,
  resetState,
  deleteFromWatchList,
})(ProfileWatchlist);
