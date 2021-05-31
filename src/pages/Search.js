import React, { useState, useEffect } from "react";
import "./stylesheets/Search.css";
import { connect } from "react-redux";
import { FadeLoader } from "react-spinners";
import {
  getSearchedPeople,
  getSearchedMovie,
  getSearchedTicket,
  getSearchedList,
  getPeople,
  getList,
  getTicket,resetSearchPage,
} from "../redux/actions/searchAction";
import { Avatar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import TicketPost from "../components/TicketPost";
import ListCard from "../components/ListCard";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MashCarousel from "../components/MashCarousel";
import SearchSkeleton from "../loadingSkeletons/SearchSkeleton";
function Search({
  getSearchedPeople,
  getSearchedMovie,
  loadingSearchedPeople,
  loadingSearchedMovie,
  searchedPeople,
  searchedMovie,
  getSearchedTicket,
  searchedTicket,
  loadingSearchedTicket,
  searchedList,
  loadingSearchedList,
  getSearchedList,
  authenticated,
  authLoading,
  getPeople,
  getList,
  getTicket,
  peopleList,
  browseMovieList,
  ticketList,
  loadingPeople,
  loadingTicket,
  loadingList,
  resetSearchPage,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (searchQuery !== "") {
      getSearchedPeople(searchQuery);
      getSearchedMovie(searchQuery);
      getSearchedTicket(searchQuery);
      getSearchedList(searchQuery);
    }
    // console.log(!loadingSearchedMovie && searchedMovie.length === 0);
  }, [
    searchQuery,
    getSearchedPeople,
    getSearchedMovie,
    getSearchedTicket,
    getSearchedList,
  ]);
  useEffect(() => {
    if (!authLoading) {
      if (!authenticated) {
        history.push("/login");
      } else {
        getPeople();
        getList();
        getTicket();
      }
    }
    return () => {
      resetSearchPage();
    };
  }, [
    authLoading,
    authenticated,
    history,
    getPeople,
    getList,
    getTicket,
    resetSearchPage,
  ]);
  return (
    <div className="search">
      <div className="search__searchBar__input">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="search ..."
        ></input>
        {/* <div className="search__icon">
          <SearchIcon />
        </div> */}
      </div>
      {searchQuery !== "" ? (
        <div className="search__content">
          <div className="search_content__peopleMovie">
            {loadingSearchedPeople ? (
              <div className="search__content__loading ">
                <FadeLoader color="#499E4C" />
              </div>
            ) : searchedPeople.length === 0 && searchQuery !== "" ? (
              <div className="search__content__loading ">
                <h3>User Not Found</h3>
              </div>
            ) : (
              <div className="search__content__people">
                <h2>Peoples</h2>
                <div className="search__content__peopleResults">
                  {searchedPeople.map((people) => (
                    <div
                      key={people._id}
                      onClick={() => history.push(`/@${people.userName}`)}
                      className="search__content__peopleResult"
                    >
                      <div className="search__content__avatar">
                        <Avatar src={people.profileImageUrl} />
                        <span>{people.userName}</span>
                      </div>

                      {/* <div className="peopleMatchCard__content__button">
                  <button>Follow</button>
                </div> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {loadingSearchedMovie ? (
              <div className="search__content__loading">
                <FadeLoader color="#499E4C" />
              </div>
            ) : searchedMovie.length === 0 && searchQuery !== "" ? (
              <div className="search__content__loading">
                <h3>Movie Not Found</h3>
              </div>
            ) : (
              <div className="search__content__movies">
                <h2>Movies</h2>
                <div className="search__content__movieResults">
                  {searchedMovie.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => history.push(`/movie/${movie.id}`)}
                      className="search__content__movieResult"
                    >
                      {movie.poster_path !== null ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                        />
                      ) : (
                        <img
                          src="https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                          alt={movie.title}
                        />
                      )}
                      <span>
                        {movie.title === undefined ? movie.name : movie.title} (
                        {movie.release_date !== undefined &&
                          movie.release_date.split("-")[0]}
                        )
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {searchedTicket.length !== 0 && (
            <div className="search__content__tickets">
              <div className="search__content__ticketsContainer">
                <h2>Tickets</h2>
                <div className="search__content__ticketList">
                  <MashCarousel
                    compenentSize={627}
                    totalItemInAFrame={2}
                    componentRightMargin={20}
                    transparentHeight={45}
                    buttonTopMargin={43}
                  >
                    {searchedTicket.map((ticket) => (
                      <TicketPost
                        details={ticket}
                        postId={ticket._id}
                        type={ticket.type}
                        likeCount={ticket.likeCount}
                      />
                    ))}
                  </MashCarousel>
                </div>
              </div>
            </div>
          )}
          {searchedList.length !== 0 && (
            <div className="search__content__list">
              <div className="search__content__movieListContainer">
                {" "}
                <h2>Lists</h2>
                <div className="search__content__movieList searchedList">
                  <MashCarousel
                    compenentSize={430}
                    totalItemInAFrame={3}
                    componentRightMargin={20}
                    transparentHeight={45}
                  >
                    {searchedList.map((list) => (
                      <ListCard
                        id={list._id}
                        createdBy={list.createdBy}
                        listTitle={list.listTitle}
                        description={list.description}
                        movieList={list.movieList}
                        privacyValue={list.privacy}
                        tagArray={list.tags}
                      />
                    ))}
                  </MashCarousel>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="search__browse">
          <div className="search__container">
            {loadingTicket || loadingList || loadingPeople ? (
              <SearchSkeleton />
            ) : (
              <>
                {peopleList.length !== 0 && (
                  <div className="search__browse__people">
                    <h2>
                      Peoples{" "}
                      <Link to="/browse/people">
                        <span>see all</span>
                      </Link>
                    </h2>
                    <div className="search__peopleCardList">
                      <MashCarousel
                        compenentSize={190}
                        componentRightMargin={20}
                        totalItemInAFrame={6}
                      >
                        {peopleList.map((person) => (
                          <div key={person._id} className="search__peopleCard">
                            <div className="search__avatar">
                              <img
                                src={person.profileImageUrl}
                                alt={person.fullName}
                              />
                              <span>{person.fullName}</span>
                            </div>

                            <div className="peopleMatchCard__content__button widthButton">
                              <button>Follow</button>
                            </div>
                          </div>
                        ))}
                      </MashCarousel>
                    </div>
                  </div>
                )}

                {browseMovieList.length !== 0 && (
                  <div className="search__browse__lists">
                    <h2>
                      Lists
                      <Link to="/browse/lists">
                        <span>see all</span>
                      </Link>
                    </h2>
                    <div className="search__browse__movielist">
                      <MashCarousel
                        compenentSize={430}
                        totalItemInAFrame={3}
                        componentRightMargin={20}
                        transparentHeight={45}
                      >
                        {browseMovieList.map((list) => (
                          <div className="search__browse__movieListCard">
                            <ListCard
                              id={list._id}
                              createdBy={list.createdBy}
                              listTitle={list.listTitle}
                              description={list.description}
                              movieList={list.movieList}
                              privacyValue={list.privacy}
                              tagArray={list.tags}
                              isMyProfile={false}
                            />
                          </div>
                        ))}
                      </MashCarousel>
                    </div>
                  </div>
                )}
                {ticketList.length !== 0 && (
                  <div className="search__browse__ticket">
                    <h2>
                      Tickets
                      <Link to="/browse/tickets">
                        <span>see all</span>
                      </Link>
                    </h2>
                    <div className="search__browse__ticketList">
                      <MashCarousel
                        compenentSize={627}
                        totalItemInAFrame={2}
                        componentRightMargin={20}
                        transparentHeight={45}
                        buttonTopMargin={43}
                      >
                        {ticketList.map((ticket) => (
                          <div className="search__browse__ticketListCard">
                            <TicketPost
                              details={ticket}
                              postId={ticket._id}
                              type={ticket.type}
                              likeCount={ticket.likeCount}
                            />
                          </div>
                        ))}
                      </MashCarousel>
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="search__browse__movieGenreBrowse">
              <h2>Browse genre</h2>
              <div className="search__browse__movieGenreBrowse__genreList">
                <div
                  onClick={() => history.push("/browse/genre/Action")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Action"
                >
                  <span>Action</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Comedy")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Comedy"
                >
                  <span>Comedy</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Horror")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Horror"
                >
                  <span>Horror</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Thriller")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Thriller"
                >
                  <span>Thriller</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Adventure")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Adventure"
                >
                  <span>Adventure</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Drama")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Drama"
                >
                  <span>Drama</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Crime")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Crime"
                >
                  <span>Crime</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Family")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Family"
                >
                  <span>Family</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Fantasy")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Fantasy"
                >
                  <span>Fantasy</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Animation")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Animation"
                >
                  <span>Animation</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Sci-Fi")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Sci-fi"
                >
                  <span>Sci-Fi</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Romance")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Romance"
                >
                  <span>Romance</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/War")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard War"
                >
                  <span>War</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Documentary")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Documentary"
                >
                  <span>Documentary</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/Music")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Music"
                >
                  <span>Music</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/History")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard History"
                >
                  <span>History</span>
                  <ArrowForwardIcon />
                </div>
                <div
                  onClick={() => history.push("/browse/genre/TV Movie")}
                  className="search__browse__movieGenreBrowse__genreList__genreCard Tv-Movies"
                >
                  <span>Tv Movie</span>
                  <ArrowForwardIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    peopleList: state.search.people,
    browseMovieList: state.search.list,
    ticketList: state.search.ticket,
    searchedPeople: state.search.searchedPeople,
    searchedMovie: state.search.searchedMovie,
    searchedTicket: state.search.searchedTicket,
    searchedList: state.search.searchedList,
    loadingSearchedTicket: state.search.loadingSearchedTicket,
    loadingSearchedPeople: state.search.loadingSearchedPeople,
    loadingSearchedMovie: state.search.loadingSearchedMovie,
    loadingSearchedList: state.search.loadingSearchedList,
    authenticated: state.user.authenticated,
    authLoading: state.user.authLoading,
    loadingPeople: state.search.loadingPeople,
    loadingTicket: state.search.loadingTicket,
    loadingList: state.search.loadingList,
  };
};
export default connect(mapStateToProps, {
  getSearchedPeople,
  getSearchedMovie,
  getSearchedTicket,
  getSearchedList,
  getPeople,
  getList,
  getTicket,
  resetSearchPage,
})(Search);


