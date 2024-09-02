import React, { useState } from "react";
import Home from "./Home";
import { fetchMovies } from "../../movies";

const Homes = ({ movies }) => {
  return (
    <>
      <div className="home">
        <Home items={movies} />
      </div>
      <div className="margin"></div>
    </>
  );
};

export default Homes;
