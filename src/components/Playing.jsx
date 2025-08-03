import React from "react";
import Home from "./Home";
import "./playing.css";

const Playing = ({ upcomingItems }) => {
  return (
    <>
      <div className="playing">
        <Home upcomingItems={upcomingItems} />
      </div>
    </>
  );
};

export default Playing;
