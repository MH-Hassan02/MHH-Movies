import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Upcoming from "./Upcoming";
import "./singlePage.css";
import loadingAnimation from "../../images/Animation - 1719660715053.gif"

const SinglePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const isMovie = window.location.pathname.startsWith("/movies");
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = isMovie
      ? `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.results;
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      const recommendedMoviesData = await fetchData();
      setRecommendedMovies(recommendedMoviesData);

      const API_KEY = import.meta.env.VITE_API_KEY;
      const url = isMovie
        ? `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
      const response = await axios.get(url);
      setItem(response.data);
    };
    getMovieDetails();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <div style={{ display: !loading ? "block" : "none" }}>
        {item ? (
          <>
            <section className="singlePage">
              <div className="singleHeading">
                <h1>{isMovie ? item.title : item.name}</h1>
                <span>
                  {" "}
                  | {isMovie ? item.release_date : item.first_air_date} |{" "}
                </span>
                <span> HD </span>
              </div>
              <div className="container">
                <iframe
                  src={
                    isMovie
                      ? `https://vidsrc.cc/embed/movie/${id}`
                      : `https://vidsrc.cc/embed/tv/${id}`
                  }
                  allowFullScreen
                  width="100%"
                  height="600px"
                ></iframe>

                <div className="para">
                  <h3>
                    <span>Rating</span> : {item.vote_average.toFixed(2)}
                  </h3>
                  <p>{item.overview}</p>
                </div>
                <div className="social">
                  <i className="fa fa-share fa-lg"></i>
                  <img
                    src="https://img.icons8.com/color/48/000000/facebook-new.png"
                    alt="Facebook"
                  />
                  <img
                    src="https://img.icons8.com/fluency/48/000000/twitter-circled.png"
                    alt="Twitter"
                  />
                  <img
                    src="https://img.icons8.com/fluency/48/000000/instagram-new.png"
                    alt="Instagram"
                  />
                </div>
              </div>
            </section>
            <Upcoming
              items={recommendedMovies}
              title={isMovie ? "Similar Movies" : "Similar Shows"}
            />
          </>
        ) : (
          <h3>404 : Not Found</h3>
        )}
      </div>

      <div className="loaderImg" style={{ display: loading ? "flex" : "none" }}>
        <img
          src={loadingAnimation}
          height="100"
          width="100"
          alt="Loading Animation"
        ></img>
      </div>
    </>
  );
};

export default SinglePage;
