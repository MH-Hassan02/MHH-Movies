import React from "react";
import "./Pages.css";
import { Link } from "react-router-dom";

const Pages = () => {
  return (
    <>
      <div className="container">
        <div className="pagesContainer">
          <ul>
            <h3>Movies</h3>
            <li>
              <ul>
                <Link to="/moviesList/Popular Movies">
                  <li>Popular Movies</li>
                </Link>
                <Link to="/moviesList/Top Rated Movies">
                  <li>Top Rated Movies</li>
                </Link>
                <Link to="/moviesList/Upcoming Movies">
                  <li>Upcoming Movies</li>
                </Link>
                <Link to="/moviesList/Recommended Movies">
                  <li>Recommended Movies</li>
                </Link>
                <Link to="/moviesList/Playing Movies">
                  <li>Movies Playing Now</li>
                </Link>
              </ul>
            </li>

            <h3>Series</h3>
            <li>
              <ul>
                <Link to="/SeriesList/Popular Series">
                  <li>Popular Series</li>
                </Link>
                <Link to="/SeriesList/Top Rated Series">
                  <li>Top Rated Series</li>
                </Link>
              </ul>
            </li>

            <Link to="/Pricing">
              <li>Pricing</li>
            </Link>
            <Link to="/Contact">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pages;
