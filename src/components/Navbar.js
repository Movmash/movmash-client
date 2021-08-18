import React, { useState, useEffect } from "react";
import "./stylesheets/Navbar.css";
import { useLocation, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
// import MovieIcon from "@material-ui/icons/Movie";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SearchIcon from "@material-ui/icons/Search";
// import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import { ClickAwayListener, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import EventIcon from "@material-ui/icons/Event";
import { Dialog } from "@material-ui/core";
import RequestedTicketDialog from "./RequestedTicketDialog";
import { getRequestedTicket } from "../redux/actions/ticketAction";
import { Badge } from "@material-ui/core";
import {
  logoutUser,
} from "../redux/actions/userAction";
function Navbar({
  profileImage,
  getRequestedTicket,
  authenticated,
  ticketNotification,
  userName,
  logoutUser,
}) {
  const location = useLocation();
  const history = useHistory();
  const [openTicket, setOpenTicket] = useState(false);
  const [openProfileMenu, setOpenProfile] = useState(false);
  const handleClickAwayProfileMenu = () => {
    setOpenProfile(false);
  };
  const handleClickMenu = () => {
    setOpenProfile(true);
  };
  const handleOpenTicketDialog = () => {
    setOpenTicket(true);
  };
  const handleCloseTicketDialog = () => {
    setOpenTicket(false);
  };
  useEffect(() => {
    if (authenticated) {
      getRequestedTicket();
    }
  }, [getRequestedTicket, authenticated]);
  return (
    <div className="navbar">
      <div className="navbar__left">
        <h2 className="navbar__leftLogo">MOVMASH</h2>
      </div>
      <div className="navbar__center">
        <div
          className={`navbar__center__icon ${
            location.pathname === "/live" && "active"
          }`}
          onClick={() => history.push("/live")}
        >
          <LiveTvIcon />
        </div>

        {/* <div
          className={`navbar__center__icon ${
            location.pathname === "/movies" && "active"
          }`}
          onClick={() => history.push("/movies")}
        >
          <MovieIcon />
        </div> */}

        <div
          className={`navbar__center__icon ${
            location.pathname === "/" && "active"
          }`}
          onClick={() => history.push("/")}
        >
          <HomeIcon />
        </div>
        {/* 
        <div
          className={`navbar__center__icon ${
            location.pathname === "/explore" && "active"
          }`}
          onClick={() => history.push("/explore")}
        >
          <PeopleIcon />
        </div> */}

        <div
          className={`navbar__center__icon ${
            location.pathname === "/search" && "active"
          }`}
          onClick={() => history.push("/search")}
        >
          <SearchIcon />
        </div>
      </div>
      <div className="navbar__right">
        <div className={`navbar__right__iconStyle`}>
          <IconButton onClick={handleOpenTicketDialog}>
            <Badge badgeContent={ticketNotification} color="secondary">
              <EventIcon />
            </Badge>
          </IconButton>
        </div>
        <Dialog onClose={handleCloseTicketDialog} open={openTicket}>
          <RequestedTicketDialog
            closeRequestedDialog={handleCloseTicketDialog}
          ></RequestedTicketDialog>
        </Dialog>
        <div className="navbar__profile__menu">
          <ClickAwayListener onClickAway={handleClickAwayProfileMenu}>
            <div className="navbar__profile__menu--click_away">
              <Avatar onClick={handleClickMenu} src={profileImage}>
                <div className="loading_avatar"></div>
              </Avatar>
              {openProfileMenu ? (
                <div className="navbar__profile__menu__ClickAway">
                  <div
                    onClick={() =>{ history.push(`/@${userName}`); handleClickAwayProfileMenu();}}
                    className="navbar__profile__menuItem"
                  >
                    <span>Profile</span>
                  </div>
                  <div
                    onClick={() =>{ logoutUser(); handleClickAwayProfileMenu();}}
                    className="navbar__profile__menuItem"
                  >
                    <span>Log Out</span>
                  </div>
                </div>
              ) : null}
            </div>
          </ClickAwayListener>
        </div>{" "}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
    profileImage: state.user.profileImageUrl,
    authenticated: state.user.authenticated,
    ticketNotification: state.ticket.totalCompletedReminder,
  };
};
export default connect(mapStateToProps, { logoutUser, getRequestedTicket })(
  Navbar
);
