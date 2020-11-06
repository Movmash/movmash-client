import React from "react";
import "./stylesheets/LiveShowCard.css";
import UserNamePlate from "./UserNamePlate";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getLiveShowDetail } from "../redux/actions/liveShowAction";
function LiveShowCard({
  roomCode,
  description,
  posterUrl,
  memberNumber,
  roomTitle,
  host,
  getLiveShowDetail,
}) {
  const { profileImageUrl, userName, fullName } = host;
  // const history = useHistory
  const history = useHistory();
  const handleJoinParty = (roomId) => {
    getLiveShowDetail(roomId, history);
  };
  return (
    <div className="liveShowCard">
      <div className="liveShowCard__banner">
        <div className="liveShowCard__banner__wrapper">
          <img src={posterUrl} alt={roomTitle} />
        </div>
        <div className="liveShowCard__banner__skin"></div>
        <div className="liveShowCard__banner__content">
          <div className="liveShowCard__banner__content__left">
            <button className="button_icon">
              <InfoOutlinedIcon />
            </button>
          </div>
          <div className="liveShowCard__banner__content__right">
            <div className="liveShowCard__banner__content__right__topButton">
              <button className="button_icon">
                <PersonIcon /> <span> {memberNumber}</span>
              </button>
            </div>

            <div className="liveShowCard__banner__content__right__bottomButton">
              {" "}
              <button
                onClick={() => handleJoinParty(roomCode)}
                className="button_icon"
              >
                Join Party
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="liveShowCard__hostInfo">
        <UserNamePlate
          username={userName}
          name={fullName}
          imageUrl={profileImageUrl}
        />
      </div>
    </div>
  );
}

export default connect(null, { getLiveShowDetail })(LiveShowCard);
