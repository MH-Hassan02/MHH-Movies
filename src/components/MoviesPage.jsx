import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchMovies,
  fetchTopMovies,
  fetchPlayingMovies,
  fetchRecommendedMovies,
  fetchUpcomingMovies,
  fetchPopularSeries,
  fetchTopSeries,
} from "../../movies";
import ListCard from "./ListCard";
import "./MoviesPage.css";
import Pagination from "./Pagination";
import loadingAnimation from "../../images/Animation - 1719660715053.gif"

const MoviesPage = () => {
  const { type } = useParams();
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [playingMovies, setPlayingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  let itemsPerPage = 20;
  let totalPages = 5;

  useEffect(() => {
    const LoadMoviesData = async () => {
      if (type === "Popular Movies") {
        const moviesData = await fetchMovies(5);
        setMovies(moviesData);
      } else if (type === "Recommended Movies") {
        const moviesData = await fetchRecommendedMovies(2);
        setRecommendedMovies(moviesData);
      } else if (type === "Upcoming Movies") {
        const moviesData = await fetchUpcomingMovies(5);
        setUpcomingMovies(moviesData);
      } else if (type == "Top Rated Movies") {
        const moviesData = await fetchTopMovies(5);
        setTopMovies(moviesData);
      } else if (type === "Playing Movies") {
        const moviesData = await fetchPlayingMovies(5);
        setPlayingMovies(moviesData);
      } else if (type == "Top Rated Series") {
        const moviesData = await fetchTopSeries(5);
        setTopSeries(moviesData);
      } else if (type === "Popular Series") {
        const moviesData = await fetchPopularSeries(5);
        setPopularSeries(moviesData);
      } else {
        const moviesData = location.state?.moviesData || [];
        setSearchedMovies(moviesData);
      }
    };
    LoadMoviesData();
  }, [type, location.state]);

  let selectedMovies;
  if (type === "Popular Movies") {
    selectedMovies = movies;
  } else if (type === "Recommended Movies") {
    selectedMovies = recommendedMovies;
    totalPages = 2;
  } else if (type === "Upcoming Movies") {
    selectedMovies = upcomingMovies;
  } else if (type == "Top Rated Movies") {
    selectedMovies = topMovies;
  } else if (type === "Playing Movies") {
    selectedMovies = playingMovies;
  } else if (type == "Top Rated Series") {
    selectedMovies = topSeries;
  } else if (type === "Popular Series") {
    selectedMovies = popularSeries;
  } else {
    selectedMovies = searchedMovies;
    totalPages = 1;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = selectedMovies.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <div style={{ display: loading ? "none" : "block" }}>
        {selectedMovies.length != 0 ? (
          <>
            <div className="listContainer">
              <h1>{type}</h1>
              <div className="mainContainer">
                {currentMovies.map((item) => (
                  <ListCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="errorMsg">
            <h3>Oops!</h3>
            <h3>Movie Not Found</h3>
          </div>
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

export default MoviesPage;
