import React, { useState, useEffect } from "react";
import "./stylesheets/ActivityContainer.css";
import { connect } from "react-redux";
import { getGenreLiveShow } from "../redux/actions/liveShowAction";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
function ActivityContainer({
  title,
  Component,
  // liveShows,

  type,
  getGenreLiveShow,
  content,
}) {
  const [nextShow, setNextShow] = useState(5);
  useEffect(() => {
    if (type) {
      getGenreLiveShow(type);
    }
  }, [type, getGenreLiveShow]);
  return (
    <div className="activityContainer">
      {content.length !== 0 && (
        <>
          {" "}
          <div className="activityContainer__title">
            <h1>{title}</h1>
          </div>
          <div className="activityContainer__containers">
            {content.slice(0, nextShow).map((show) => (
              <>
                <div key={show._id} className="activityContainer__container">
                  <Component {...show} />
                </div>
                <div key={show._id} className="activityContainer__container">
                  <Component {...show} />
                </div>
                <div key={show._id} className="activityContainer__container">
                  <Component {...show} />
                </div>
                <div key={show._id} className="activityContainer__container">
                  <Component {...show} />
                </div>
                <div key={show._id} className="activityContainer__container">
                  <Component {...show} />
                </div>
                <div key={show._id} className="activityContainer__container">
                  <Component {...show} />
                </div>
                <div key={show._id} className="activityContainer__container">
                  <Component {...show} />
                </div>
              </>
            ))}
          </div>
          {nextShow < content.length && (
            <div className="activityContainer__expandButton">
              <button
                onClick={() => {
                  setNextShow((prev) => prev + 5);
                }}
                className="more_content"
              >
                <KeyboardArrowDownOutlinedIcon />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default connect(null, { getGenreLiveShow })(ActivityContainer);
