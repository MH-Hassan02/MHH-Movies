import React from "react";
import { Link } from "react-router-dom";
import "./homes.css";
import playButton from '../../images/play-button.png'
import play from '../../images/play.png'

const HomeCard = ({
  item: {
    id,
    backdrop_path,
    poster_path,
    title,
    vote_average,
    release_date,
    overview,
  },
  carousel,
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
      <div className="box" data-aos="fade-up" data-aos-duration="500">
        <div className="coverImage">
          <img
            src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
            alt={title}
          />
        </div>
        <div className="content flex">
          <div className="details row">
            <h1>{title}</h1>
            <div className="rating flex">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half"></i>
            </div>
            <span>Reviews: </span>
            <label htmlFor="">{vote_average.toFixed(2)}</label>
            <br />
            <span>Release Date: </span>
            <label htmlFor="">{release_date}</label>
          </div>
          <p>{overview}</p>
          {!carousel && (
            <div className="playButtonContainer">
              <div className="playButton">
                <Link to={`/movies/${id}`}>
                  <button onClick={() => setID(id)}>
                    <div className="img">
                      <img src={`${play}`} alt="" />
                      <img
                        src={`${playButton}`}
                        alt=""
                        className="change"
                      />
                    </div>
                    WATCH MOVIE
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeCard;
