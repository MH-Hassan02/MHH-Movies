import React from "react";
import { Link } from "react-router-dom";

const UpcomingCard = ({
  item: {
    id,
    backdrop_path,
    poster_path,
    title,
    vote_average,
    release_date,
    overview,
    name,
    first_air_date
  },
}) => {

  const setID = (id) => {
    const existingIDs = JSON.parse(localStorage.getItem("id")) || [];
    existingIDs.push(id);
    if (existingIDs.length > 5) {
      localStorage.setItem("id", JSON.stringify(existingIDs.slice(-5)));
    } else {
      localStorage.setItem("id", JSON.stringify(existingIDs));
    }
  };
  return (
    <>
      <Link to={title? `/movies/${id}` : `/series/${id}`}>
        <div className="movieBox" onClick={() => setID(id)}>
          <div className="img">
            <img
              src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
              alt=""
            />
          </div>
          <div className="text">
            <h3>{title}{name}</h3>
            <span>{release_date}{first_air_date}</span> <br />
            <button className="btnPrimary">
              <i className="fa fa-play"></i>PLAY NOW
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UpcomingCard;
