import React from "react";
import "./stylesheets/TabLoadingData.css";
import { MoonLoader } from "react-spinners";
function TabLoadingData() {
  return (
    <div className="tabLoadingData">
      <MoonLoader color={"#499E4C"} size={40}/>
    </div>
  );
}

export default TabLoadingData;
