import React, { useState } from "react";
import "./stylesheets/LeftSideBar.css";
import { IconButton, Avatar, Link } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import AddIcon from "@material-ui/icons/Add";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Dialog from "@material-ui/core/Dialog";
import PostReviewPost from "./PostReviewPost";
import PostSuggestMePost from "./PostSuggestMePost";
import PostTicketPost from "./PostTicketPost";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";
function LeftSideBar({ logoutUser, userName, userImage }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openSuggestMeDialog, setOpenSuggestMeDialog] = useState(false);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
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
  return (
    <div className="leftSideBar">
      <div className="leftSideBar__container">
        {" "}
        <div className="leftSideBar__container__icon hover">
          {" "}
          <Link href={`/@${userName}`}>
            <Avatar src={userImage} />
          </Link>
        </div>
        <div className="leftSideBar__container__icon">
          <IconButton>
            <TelegramIcon />
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
                      <PostReviewPost closeReview={handleCloseReview} />
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
                      <PostTicketPost closeTicket={handleCloseTicket} />
                    </div>
                  </Dialog>
                </div>
              ) : null}
            </div>
          </ClickAwayListener>
        </div>
        <div className="leftSideBar__container__icon">
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
        </div>
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
  };
};

export default connect(mapStateToProps, { logoutUser })(LeftSideBar);
