import React, { useState, useEffect } from "react";
import "./stylesheets/LiveShow.css";
import { Dialog } from "@material-ui/core";
import CreatePartyForm from "../components/CreatePartyForm";
import ActivityContainer from "../components/ActivityContainer";
import LiveShowCard from "../components/LiveShowCard";
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
// import liveShowCoverImage from "../images/live_show_cover_image_1.jpeg"
import liveShowCoverImage from "../images/live_show_cover_image_2.jpg";
// import liveShowCoverImage from "../images/live_show_cover_image_3.jpg";
// import liveShowCoverImage from "../images/live_show_cover_image_4.jpg";
// import liveShowCoverImage from "../images/live_show_cover_image_5.jpg";
// import liveShowCoverImage from "../images/live_show_cover_image_6.jpg";
// import liveShowCoverImage from "../images/live_show_cover_image_7.jpg";
// import liveShowCoverImage from "../images/live_show_cover_image_8.jpg";
// import liveShowCoverImage from "../images/live_show_cover_image_9.jpg";
// import { getAllLiveShow } from "../redux/actions/liveShowAction";
function LiveShow({
  action,
  adventure,
  comedy,
  crime,
  drama,
  horror,
  music,
  sciFi,
  thriller,
  myFamily,
  loadingCreateLiveShow,
  authenticated,
  authLoading
}) {
  const [openDialog, isDialogOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (!authLoading) {
      if (!authenticated)  {
        history.push("/login");
      }
    }
  }, [authLoading, authenticated, history]);
  const handleOpenDialog = () => {
    isDialogOpen(true);
  };
  const handleDialogClose = () => {
    isDialogOpen(false);
  };
  return (
    <div className="liveShow">
      {!loadingCreateLiveShow ? (
        <>
          {" "}
          <div className="liveShow__banner">
            <div className="liveShow__banner__skin">
              <img src={liveShowCoverImage} alt="banner"></img>
            </div>
            <div className="liveShow__banner__content">
              <h1>Show and watch your videos with the world</h1>

              <button onClick={handleOpenDialog} className="ripple">
                Create Theatre
              </button>
            </div>
            <div className="liveShow__creating__room">
              <Dialog onClose={handleDialogClose} open={openDialog}>
                <div className="liveShow__creating__room__form">
                  <CreatePartyForm
                    closeCreateTheatrDialog={handleDialogClose}
                  />
                </div>
              </Dialog>
            </div>
          </div>
          <div className="liveShow__content">
            <div className="liveShow__content__items">
              <div className="liveShow__content__item">
                <ActivityContainer
                  content={myFamily}
                  title="Family Party"
                  type="MyFamily"
                  Component={LiveShowCard}
                />{" "}
              </div>
              {(action.length !== 0 ||
                adventure.length !== 0 ||
                comedy.length !== 0 ||
                crime.length !== 0 ||
                drama.length !== 0 ||
                horror.length !== 0 ||
                music.length !== 0 ||
                sciFi.length !== 0 ||
                thriller.length !== 0) && (
                <>
                  {" "}
                  <h1>Global Parties</h1> <hr />{" "}
                </>
              )}
              <div className="liveShow__content__item">
                <ActivityContainer
                  content={action}
                  title="Action Party"
                  type="Action"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={adventure}
                  title="Adventure Party"
                  type="Adventure"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={comedy}
                  title="Comedy Party"
                  type="Comedy"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={crime}
                  title="Crime Party"
                  type="Crime"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={drama}
                  title="Drama Party"
                  type="Drama"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={horror}
                  title="Horror Party"
                  type="Horror"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={music}
                  title="Music Party"
                  type="Music"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={sciFi}
                  title="Sci-Fi Party"
                  type="SciFi"
                  Component={LiveShowCard}
                />{" "}
              </div>

              <div className="liveShow__content__item">
                <ActivityContainer
                  content={thriller}
                  title="Thriller Party"
                  type="Thriller"
                  Component={LiveShowCard}
                />{" "}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="home__bounceloader">
          <BounceLoader size={150} color={"#2aa44f"} loading />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    action: state.liveShow.actionShow,
    adventure: state.liveShow.adventureShow,
    comedy: state.liveShow.comedyShow,
    crime: state.liveShow.crimeShow,
    drama: state.liveShow.dramaShow,
    horror: state.liveShow.horrorShow,
    music: state.liveShow.musicShow,
    sciFi: state.liveShow.sciFiShow,
    thriller: state.liveShow.thrillerShow,
    myFamily: state.liveShow.myFamilyShow,
    loadingCreateLiveShow: state.liveShow.loadingCreateLiveShow,
    authenticated: state.user.authenticated,
    authLoading: state.user.authLoading,
  };
};

export default connect(mapStateToProps)(LiveShow);
