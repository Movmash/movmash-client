import React, { useState, useEffect } from "react";
import "./stylesheets/Navbar.css";
import { useLocation, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import MovieIcon from "@material-ui/icons/Movie";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import EventIcon from "@material-ui/icons/Event";
import { Dialog } from "@material-ui/core";
import RequestedTicketDialog from "./RequestedTicketDialog";
import { getRequestedTicket } from "../redux/actions/ticketAction";
function Navbar({ loading, profileImage, getRequestedTicket }) {
  const location = useLocation();
  const history = useHistory();
  const [openTicket, setOpenTicket] = useState(false);

  const handleOpenTicketDialog = () => {
    setOpenTicket(true);
  };
  const handleCloseTicketDialog = () => {
    setOpenTicket(false);
  };
  useEffect(() => {
    getRequestedTicket();
  });

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
        <div className={`navbar__right__iconStyle`}>
          <IconButton onClick={handleOpenTicketDialog}>
            <EventIcon />
          </IconButton>
        </div>
        <Dialog onClose={handleCloseTicketDialog} open={openTicket}>
          <RequestedTicketDialog />
        </Dialog>
        {!loading ? <Avatar src={profileImage} /> : <h1>loading</h1>}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    profileImage: state.user.profileImageUrl,
    loading: state.user.loading,
  };
};
export default connect(mapStateToProps, { getRequestedTicket })(Navbar);
