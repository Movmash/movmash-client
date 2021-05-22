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
// import Countdown from "react-countdown";
function Navbar({
  profileImage,
  getRequestedTicket,
  authenticated,
  ticketList,
  ticketNotification,
}) {
  const location = useLocation();
  const history = useHistory();
  // const countRef = useRef();
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
  // useEffect(() => {
  //   if (ticketList.length !== 0) {
  //     console.log(counter.current);
  //     // console.log("as");
  //     // let id;
  //     // setCompletedIds((prev) => {
  //     //   id = prev;
  //     //   return prev;
  //     // });
  //     // for (let i = 0; i < ticketList.length; i++) {
  //     //   setInterval(() => {
  //     //     let date = new Date(ticketList[i].showTimeTo) - new Date();
  //     //     if (date <= 0) {
  //     //       if (completedId.includes(ticketList[i]._id)) {
  //     //         return;
  //     //       } else {
  //     //         setCompletedIds((prev) => [ticketList[i]._id]);
  //     //       }
  //     //     }
  //     //   }, 2000);
  //     // }
  //   }
  // }, [counter,ticketList]);
  //...........................................
  // const [countdown, isCountdownComplete] = useState([]);
  // const renderer = ({ days, hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     return <span>You are good to go!</span>;
  //   } else {
  //     return (
  //       <span>
  //         {days}:{hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };
  // const checkCountDown = (value) => {
  //   isCountdownComplete((prev) => {
  //     return [...prev, value];
  //   });
  // };
  // const [CountDownCompenent, setCountDownCompenent] = useState([]);
  // useEffect(() => {
  //   for (let i = 0; i < ticketList.length; i++) {
  //     setCountDownCompenent((prev) => [
  //       ...prev,
  //       <Countdown
  //         renderer={renderer}
  //         date={Date.now() + (new Date(ticketList.showTimeFrom) - Date.now())}
  //         onMount={(data) => {
  //           if (data.completed) return checkCountDown(ticketList._id);
  //         }}
  //         onTick={(data) => {
  //           if (data.completed) return checkCountDown(ticketList._id);
  //         }}
  //       ></Countdown>,
  //     ]);
  //   }
  // }, [ticketList._id, ticketList.length, ticketList.showTimeFrom]);
  //...........................................
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
            // countdown={countdown}
            // timer={CountDownCompenent}
            closeRequestedDialog={handleCloseTicketDialog}
            // openTicket={openTicket}
            // handleCloseTicketDialog={handleCloseTicketDialog}
          >
            {/* {ticketList.map((ticket) => (
            <Countdown
              ref={countRef}
              key={ticket._id}
              renderer={renderer}
              onComplete={(data) => console.log(data)}
              onStart={(data) => console.log(data)}
              date={Date.now() + (new Date(ticket.showTimeFrom) - Date.now())}
              // onMount={(data) => {
              //   if (data.completed) return checkCountDown(ticket._id);
              // }}
              onTick={(data) => {
                console.log(data);
                if (data.completed) return checkCountDown(ticket._id);
              }}
            ></Countdown>
          ))} */}
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
    ticketList: state.ticket.requestedTicketList,
    ticketNotification: state.ticket.totalCompletedReminder,
  };
};
export default connect(mapStateToProps, { getRequestedTicket })(Navbar);
