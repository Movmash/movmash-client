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
import { Badge } from "@material-ui/core";
function Navbar({
  profileImage,
  getRequestedTicket,
  authenticated,
  ticketNotification,
}) {
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

        <div
          className={`navbar__center__icon ${
            location.pathname === "/movies" && "active"
          }`}
          onClick={() => history.push("/movies")}
        >
          <MovieIcon />
        </div>

        <div
          className={`navbar__center__icon ${
            location.pathname === "/" && "active"
          }`}
          onClick={() => history.push("/")}
        >
          <HomeIcon />
        </div>

        <div
          className={`navbar__center__icon ${
            location.pathname === "/explore" && "active"
          }`}
          onClick={() => history.push("/explore")}
        >
          <PeopleIcon />
        </div>

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
          >
          </RequestedTicketDialog>
        </Dialog>
        <Avatar src={profileImage}>
          <div className="loading_avatar"></div>
        </Avatar>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    profileImage: state.user.profileImageUrl,
    authenticated: state.user.authenticated,
    ticketNotification: state.ticket.totalCompletedReminder,
  };
};
export default connect(mapStateToProps, { getRequestedTicket })(Navbar);
