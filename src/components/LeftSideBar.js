import React, { useState, useEffect } from "react";
import "./stylesheets/LeftSideBar.css";
import { IconButton, Avatar, Link, Badge } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import AddIcon from "@material-ui/icons/Add";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Dialog from "@material-ui/core/Dialog";
import PostReviewPost from "./PostReviewPost";
import PostSuggestMePost from "./PostSuggestMePost";
import PostTicketPost from "./PostTicketPost";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NotificationListCard from "../components/NotificationListCard";
import { connect } from "react-redux";
import { updateRooms } from "../redux/actions/chatAction";
import {
  logoutUser,
  getAllNotification,
  addNewNotification,
  markNotificationRead,
  getUnreadUserRoom,
} from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";
import { useSocket } from "../contexts/SocketProvider";
function LeftSideBar({
  logoutUser,
  userName,
  userImage,
  postType,
  getAllNotification,
  addNewNotification,
  notifications,
  markNotificationRead,
  updateRooms,
  getUnreadUserRoom,
  messageRoom,
}) {
  const [open, setOpen] = useState(false);

  const [openNotification, setOpenNotification] = useState(false);
  const history = useHistory();
  const socket = useSocket();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openSuggestMeDialog, setOpenSuggestMeDialog] = useState(false);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  useEffect(() => {
    if (socket !== undefined) {
      socket.on("notification", (data) => {
        console.log(data);
        addNewNotification(data);
      });
    }
    return () => {};
  }, [socket, addNewNotification]);
  useEffect(() => {
    if (socket !== undefined) {
      socket.on("message-room", (roomData) => {
        console.log(roomData);
        updateRooms(roomData);
      });
    }
  }, [socket, updateRooms]);
  useEffect(() => {
    getAllNotification();
  }, [getAllNotification]);
  useEffect(() => {
    getUnreadUserRoom();
  }, [getUnreadUserRoom]);
  //..................................................................................[handle review post]
  const handleClickOpenReview = () => {
    setOpenReviewDialog(true);
  };
  const handleCloseReview = () => {
    setOpenReviewDialog(false);
  };
  //....................................................................................[handle Suggest me post]
  const handleClickOpenSuggestMe = () => {
    setOpenSuggestMeDialog(true);
  };
  const handleCloseSuggestMe = () => {
    setOpenSuggestMeDialog(false);
  };
  //....................................................................................[handle ticket post]
  const handleClickOpenTicket = () => {
    setOpenTicketDialog(true);
  };
  const handleCloseTicket = () => {
    setOpenTicketDialog(false);
  };
  const handleClickAwayNotification = () => {
    setOpenNotification(false);
  };
  const handleMarkNotificationRead = () => {
    const markReadNotification = [];
    if (notifications !== undefined) {
      notifications.filter((notification) => {
        if (notification.read === false) {
          // console.log(notification._id);
          markReadNotification.push(notification._id);
          return notification._id;
        }
      });
      console.log(markReadNotification);
      markNotificationRead(markReadNotification);
    }
  };
  return (
    <div className="leftSideBar">
      <div className="leftSideBar__container">
        {" "}
        <div
          onClick={() => history.push(`/@${userName}`)}
          className="leftSideBar__container__icon hover"
        >
          {/* <Link to={`/@${userName}`}> */}
          <Avatar src={userImage} /> {/* </Link> */}
        </div>{" "}
        <div className="leftSideBar__container__icon badge">
          <IconButton
            onClick={() => {
              history.push("/messages/inbox/");
            }}
          >
            {" "}
            <Badge
              badgeContent={messageRoom !== undefined ? messageRoom.length : 0}
              color="secondary"
            >
              <TelegramIcon />{" "}
            </Badge>
          </IconButton>
        </div>
        <div className="leftSideBar__container__icon">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="leftSideBar__container__icon--click_away">
              <div className="leftSideBar__container__icons--add">
                <IconButton onClick={handleClick}>
                  <AddIcon />
                </IconButton>
              </div>
              {open ? (
                <div className="clickAwayListener--content">
                  <div
                    onClick={() => {
                      handleClickOpenReview();
                    }}
                    className="clickAwayListener--content--menu"
                  >
                    <h4>Post your review</h4>
                  </div>
                  <Dialog
                    onClose={handleCloseReview}
                    aria-labelledby="customized-dialog-title"
                    open={openReviewDialog}
                  >
                    <div className="dialogBox--ReviewPost">
                      <PostReviewPost
                        postType={postType}
                        closeReview={handleCloseReview}
                      />
                    </div>
                  </Dialog>
                  <div
                    onClick={() => {
                      handleClickOpenSuggestMe();
                    }}
                    className="clickAwayListener--content--menu"
                  >
                    <h4>Want Suggestions</h4>
                  </div>
                  <Dialog
                    onClose={handleCloseSuggestMe}
                    open={openSuggestMeDialog}
                  >
                    <div className="dialogBox--SuggestMePost">
                      <PostSuggestMePost
                        postType={postType}
                        closeSuggestMe={handleCloseSuggestMe}
                      />
                    </div>
                  </Dialog>
                  <div
                    onClick={() => {
                      handleClickOpenTicket();
                    }}
                    className="clickAwayListener--content--menu"
                  >
                    <h4>Create ticket</h4>
                  </div>
                  <Dialog onClose={handleCloseTicket} open={openTicketDialog}>
                    <div className="dialogBox--TicketPost">
                      <PostTicketPost
                        postType={postType}
                        closeTicket={handleCloseTicket}
                      />
                    </div>
                  </Dialog>
                </div>
              ) : null}
            </div>
          </ClickAwayListener>
        </div>{" "}
        <div className="leftSideBar__container__icon">
          <ClickAwayListener onClickAway={handleClickAwayNotification}>
            <div className="leftSideBar__container__icon--click_away">
              <div className="badge">
                <IconButton
                  onClick={() => {
                    setOpenNotification((prev) => !prev);
                    handleMarkNotificationRead();
                  }}
                >
                  <Badge
                    badgeContent={
                      notifications !== undefined
                        ? notifications.filter(
                            (notification) => notification.read === false
                          ).length
                        : 0
                    }
                    color="secondary"
                  >
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
              </div>
              {openNotification ? (
                <div className="notificationClickAway">
                  {notifications.map((notification) => {
                    if (notification.type === "like") {
                      return (
                        <NotificationListCard
                          key={notification._id}
                          imageUrl={notification.senderId.profileImageUrl}
                          type={notification.type}
                          message="liked your post"
                          userName={notification.senderId.userName}
                        />
                      );
                    }
                    if (notification.type === "comment") {
                      return (
                        <NotificationListCard
                          key={notification._id}
                          imageUrl={notification.senderId.profileImageUrl}
                          type={notification.type}
                          message="commented on your post"
                          userName={notification.senderId.userName}
                        />
                      );
                    }
                  })}
                </div>
              ) : null}
            </div>
          </ClickAwayListener>
        </div>{" "}
        <div className="leftSideBar__container__icon">
          <IconButton onClick={() => logoutUser()}>
            <PowerSettingsNewIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
    userImage: state.user.profileImageUrl,
    notifications: state.user.notifications,
    messageRoom: state.user.messageRoom,
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  getAllNotification,
  addNewNotification,
  markNotificationRead,
  updateRooms,
  getUnreadUserRoom,
})(LeftSideBar);
