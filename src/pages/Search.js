import React, { useState, useEffect } from "react";
import "./stylesheets/Search.css";
import { connect } from "react-redux";
import { FadeLoader } from "react-spinners";
import {
  getSearchedPeople,
  getSearchedMovie,
  getSearchedTicket,
  getSearchedList,
} from "../redux/actions/searchAction";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TicketPost from "../components/TicketPost";
import ListCard from "../components/ListCard";
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
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  useEffect(() => {
    getSearchedPeople(searchQuery);
    getSearchedMovie(searchQuery);
    getSearchedTicket(searchQuery);
    getSearchedList(searchQuery);
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
      }
    }
  }, [authLoading, authenticated, history]);
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

          <div className="search__content__tickets">
            {searchedTicket.length !== 0 && (
              <div className="search__content__ticketsContainer">
                {" "}
                <h2>Tickets</h2>
                <div className="search__content__ticketList">
                  {searchedTicket.map((ticket) => (
                    <div key={ticket._id} className="ticketContainer">
                      <TicketPost
                        details={ticket}
                        postId={ticket._id}
                        type={ticket.type}
                        likeCount={ticket.likeCount}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="search__content__list">
            {searchedList.length !== 0 && (
              <div className="search__content__movieListContainer">
                {" "}
                <h2>Lists</h2>
                <div className="search__content__movieList">
                  {searchedList.map((list) => (
                    <div key={list._id} className="listContainer">
                      <ListCard
                        id={list._id}
                        createdBy={list.createdBy}
                        listTitle={list.listTitle}
                        description={list.description}
                        movieList={list.movieList}
                        privacyValue={list.privacy}
                        tagArray={list.tags}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="search__browse">
          <div className="search__container">
            <div className="search__browse__people">
              <h2>Peoples</h2>
              <div className="search__peopleCardList">
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>{" "}
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>{" "}
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>{" "}
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>{" "}
                <div className="search__peopleCard">
                  <div className="search__avatar">
                    <img
                      src="https://i.pinimg.com/236x/3c/f5/7f/3cf57f5504727d17df4ea776c80b8c8a.jpg"
                      alt=""
                    />
                    <span>mrankurkuanl</span>
                  </div>

                  <div className="peopleMatchCard__content__button widthButton">
                    <button>Follow</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="search__browse__lists"></div>
            <div className="search__browse__movieGenreBrowse"></div>
            <div className="search__browse__people"></div>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    searchedPeople: state.search.searchedPeople,
    searchedMovie: state.search.searchedMovie,
    searchedTicket: state.search.searchedTicket,
    searchedList: state.search.searchedList,
    loadingSearchedTicket: state.search.loadingSearchedTicket,
    loadingSearchedPeople: state.search.loadingSearchedPeople,
    loadingSearchedMovie: state.search.loadingSearchedMovie,
    loadingSearchedList: state.search.loadingSearchedList,
    authenticated: state.user.authenticated,
    authLoading: state.user.authLoading
  };
};
export default connect(mapStateToProps, {
  getSearchedPeople,
  getSearchedMovie,
  getSearchedTicket,
  getSearchedList,
})(Search);
