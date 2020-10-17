import React from "react";
import "./stylesheets/TabLoadingData.css";
import { FadeLoader } from "react-spinners";
function TabLoadingData() {
  return (
    <div className="tabLoadingData">
      <FadeLoader color={"#499E4C"} />
    </div>
  );
}

export default TabLoadingData;
