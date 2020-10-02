import React from "react";
import "./stylesheets/Navbar.css";
import { useLocation, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import MovieIcon from "@material-ui/icons/Movie";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";
function Navbar() {
  const location = useLocation();
  const history = useHistory();

  console.log(location.pathname === "/");
  return (
    <div className="navbar">
      <div className="navbar__left">
        <h2 className="navbar__leftLogo">MOVMASH</h2>
      </div>
      <div className="navbar__center">
        <div className="navbar__center__icon">
          <div
            className={`navbar__center__iconStyle ${
              location.pathname === "/live" && "active"
            }`}
          >
            <IconButton onClick={() => history.push("/live")}>
              <LiveTvIcon />
            </IconButton>
          </div>
        </div>

        <div className="navbar__center__icon">
          <div
            className={`navbar__center__iconStyle ${
              location.pathname === "/movies" && "active"
            }`}
          >
            {" "}
            <IconButton onClick={() => history.push("/movies")}>
              <MovieIcon />
            </IconButton>
          </div>
        </div>

        <div className="navbar__center__icon">
          <div
            className={`navbar__center__iconStyle ${
              location.pathname === "/" && "active"
            }`}
          >
            <IconButton onClick={() => history.push("/")}>
              <HomeIcon />
            </IconButton>
          </div>
        </div>

        <div className="navbar__center__icon">
          <div
            className={`navbar__center__iconStyle ${
              location.pathname === "/explore" && "active"
            }`}
          >
            <IconButton onClick={() => history.push("/explore")}>
              <PeopleIcon />
            </IconButton>
          </div>
        </div>

        <div className="navbar__center__icon">
          <div
            className={`navbar__center__iconStyle ${
              location.pathname === "/search" && "active"
            }`}
          >
            <IconButton onClick={() => history.push("/search")}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="navbar__right">
        <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C" />
      </div>
    </div>
  );
}

export default Navbar;
