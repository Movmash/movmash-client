import React, { useState } from "react";
import "./stylesheets/LeftSideBar.css";
import { IconButton, Avatar } from "@material-ui/core";
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
function LeftSideBar({ logoutUser }) {
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
        <div className="leftSideBar__container__icon">
          <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C" />
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

export default connect(null, { logoutUser })(LeftSideBar);
