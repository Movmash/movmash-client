import React from "react";
import "./stylesheets/Search.css";
import SearchIcon from "@material-ui/icons/Search";
function Search() {
  return (
    <div className="search">
      <div className="search__container">
        <div className="search__searchBar__input">
          <input type="text" placeholder="search ..."></input>
          <div className="search__icon">
            <SearchIcon />
          </div>
        </div>
        {/* search bar */}
        {/* search content */}
        {/* explore content */}
        {/* people recommendation */}
        {/*  */}
        {/* movie */}
        {/* my list */}
      </div>
    </div>
  );
}

export default Search;
