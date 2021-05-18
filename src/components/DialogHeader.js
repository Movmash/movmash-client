import React from 'react'
import "./stylesheets/DialogHeader.css";
import CloseIcon from '@material-ui/icons/Close';

function DialogHeader({heading, close, left}) {
    return (
      <div className="dialogHeader">
        <div className="dialogHeader__container">
          <span>{heading}</span>
          <div onClick={() => close()} className="dialogHeader__closeButton" style={{left:`${left}ch`}}>
            <CloseIcon />
          </div>
        </div>
      </div>
    );
}

export default DialogHeader
