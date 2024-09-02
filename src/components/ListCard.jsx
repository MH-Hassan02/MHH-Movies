import React from "react";
import "./ListCard.css";
import { Link } from "react-router-dom";

const ListCard = ({
  item: {
    id,
    backdrop_path,
    poster_path,
    title,
    vote_average,
    release_date,
    overview,
    vote_count,
    original_language,
    name,
    first_air_date,
  },
}) => {
  return (
    <>
      <div className="cardContainer">
        <Link to={title ? `/movies/${id}` : `/series/${id}`}>
          <div className="overlay">
            <i className="fa fa-play"></i>
          </div>
          <div className="imgContainer">
            <img
              src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
              alt="Poster"
            />
          </div>
          <div className="textContainer">
            <div>
              <div className="headingContainer">
                <h3>{title || name}</h3>
                <div className="ratingContainer">
                  <div>
                    <h4>
                      <span>Rating: </span>
                      {vote_average.toFixed(2)}
                    </h4>
                  </div>
                  <div>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="otherDetails">
              <div>
                <h4>Release Date</h4>
                <h5>{release_date || first_air_date}</h5>
              </div>
              <div>
                <h4>Lang</h4>
                <h5>{original_language}</h5>
              </div>
              <div>
                <h4>Reviews</h4>
                <h5>{vote_count}</h5>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ListCard;
