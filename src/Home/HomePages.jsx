import React, { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchTopMovies,
  fetchPlayingMovies,
  fetchRecommendedMovies,
  fetchUpcomingMovies,
  fetchTopSeries,
} from "../../movies";
import Homes from "../components/Homes";
import Upcoming from "../components/Upcoming";
import Playing from "../components/Playing";
import loadingAnimation from "../../images/Animation - 1719660715053.gif"

const HomePages = () => {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [playingMovies, setPlayingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchMovies(1);
        setMovies(moviesData);

        const topMoviesData = await fetchTopMovies(1);
        setTopMovies(topMoviesData);

        const playingMoviesData = await fetchPlayingMovies(1);
        setPlayingMovies(playingMoviesData);

        const recommendedMoviesData = await fetchRecommendedMovies(1);
        setRecommendedMovies(recommendedMoviesData);

        const upcomingMoviesData = await fetchUpcomingMovies(1);
        setUpcomingMovies(upcomingMoviesData);

        const topSeriesData = await fetchTopSeries(1);
        setTopSeries(topSeriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div style={{ display: loading ? "none" : "block" }}>
        <Homes movies={movies} />
        <Playing playingItems={playingMovies} />
        <Upcoming items={upcomingMovies} title={"Upcoming Movies"} />
        <Upcoming items={topMovies} title={"Top Rated Movies"} />
        <Upcoming items={topSeries} title={"Top Rated Series"} />
        <Upcoming items={recommendedMovies} title={"Recommended Movies"} />
      </div>
      <div className="loaderImg" style={{ display: loading ? "flex" : "none" }}>
        <img src={loadingAnimation} height="100" width="100" alt="Loading Animation"></img>
      </div>
    </>
  );
};

export default HomePages;
