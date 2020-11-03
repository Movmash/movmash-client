import React, { useState } from "react";
import "./stylesheets/LiveShow.css";
import { Dialog } from "@material-ui/core";
import CreatePartyForm from "../components/CreatePartyForm";
function LiveShow() {
  const [openDialog, isDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    isDialogOpen(true);
  };
  const handleDialogClose = () => {
    isDialogOpen(false);
  };
  return (
    <div className="liveShow">
      <div className="liveShow__banner">
        <div className="liveShow__banner__skin">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
            alt="banner"
          ></img>
        </div>
        <div className="liveShow__banner__content">
          <h1>Show and watch your videos with the world</h1>

          <button onClick={handleOpenDialog} className="ripple">
            Create Theatre
          </button>
        </div>
      </div>
      <div className="liveShow__creating__room">
        <Dialog onClose={handleDialogClose} open={openDialog}>
          <div className="liveShow__creating__room__form">
            <CreatePartyForm closeCreateTheatrDialog={handleDialogClose} />
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default LiveShow;
