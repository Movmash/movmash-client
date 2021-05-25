import React, {useState} from "react";
import "./stylesheets/LiveShowCard.css";
import UserNamePlate from "./UserNamePlate";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getLiveShowDetail } from "../redux/actions/liveShowAction";
import {Dialog} from "@material-ui/core"
import RoomInfoDialog from "./RoomInfoDialog";
function LiveShowCard({
  roomCode,
  description,
  posterUrl,
  memberNumber,
  roomTitle,
  host,
  getLiveShowDetail,
  privacy,
  genre,
  userId
}) {
  const { profileImageUrl, userName, fullName } = host;
  const [openInfo, setOpenInfo] = useState(false);
  // const [userList, setUserList] = useState([]);
  // const socket = useSocket();
  const history = useHistory();
  const handleJoinParty = (roomId) => {
    getLiveShowDetail(roomId, history);
  };
  const handleInfoClose = () => {
    setOpenInfo(false)
  };
  const handleInfoOpen = () => {
    setOpenInfo(true);
  };
    // useEffect(() => {
    //   if (socket) {
    //     socket.emit("get-user-in-the-room-for-room-info", {
    //       roomId: roomCode,
    //       userId: userId,
    //     });
    //   }
    // }, [socket, roomCode, userId]);
    // useEffect(() => {
    //   if (socket) {
    //     socket.on("user-list-inside-the-room-for-room-info", (data) => {
    //       setUserList(data);
    //     });
    //   }
    // }, [socket]);
    // useEffect(() => {
    //   console.log(userList);
    // }, [userList]);
  return (
    <div className="liveShowCard">
      <div className="liveShowCard__banner">
        <div className="liveShowCard__banner__wrapper">
          <img src={posterUrl} alt={roomTitle} />
        </div>
        <div className="liveShowCard__banner__skin"></div>
        <div className="liveShowCard__banner__content">
          <div className="liveShowCard__banner__content__left">
            <button onClick={handleInfoOpen} className="button_icon">
              <InfoOutlinedIcon />
            </button>
            <Dialog open={openInfo} onClose={handleInfoClose}>
              <RoomInfoDialog
                closeInfoDialog={handleInfoClose}
                roomCode={roomCode}
                description={description}
                posterUrl={posterUrl}
                memberNumber={memberNumber}
                roomTitle={roomTitle}
                host={host}
                privacy={privacy}
                genre={genre}
                userId={userId}
                // userList={userList}
              />
            </Dialog>
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
const mapStateToProps = (state) => {
  return (
    {
      userId: state.user._id
    }
  )
}
export default connect(mapStateToProps, { getLiveShowDetail })(LiveShowCard);
