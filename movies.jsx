import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (pages) => {
  try {
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      allMovies = allMovies.concat(response.data.results);
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchTopMovies = async (pages) => {
  try {
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      allMovies = allMovies.concat(response.data.results);
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return [];
  }
};

export const fetchRecommendedMovies = async (pages) => {
  const getRandomID = () => {
    const existingIDs = JSON.parse(localStorage.getItem("id")) || [];
    if (existingIDs.length === 0) {
      const predefinedIDs = [857, 597, 109445, 157336, 19995];
      const randomIndex = Math.floor(Math.random() * predefinedIDs.length);
      const randomID = predefinedIDs[randomIndex];
      return randomID;
    } else {
      const randomIndex = Math.floor(Math.random() * existingIDs.length);
      const randomID = existingIDs[randomIndex];
      return randomID;
    }
  };
  try {
    const randomID = getRandomID();
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/movie/${randomID}/recommendations?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      allMovies = allMovies.concat(response.data.results);
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    return [];
  }
};

export const fetchPlayingMovies = async (pages) => {
  try {
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      allMovies = allMovies.concat(response.data.results);
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching playing movies:", error);
    return [];
  }
};

export const fetchUpcomingMovies = async (pages) => {
  try {
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      allMovies = allMovies.concat(response.data.results);
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

export const fetchSearchedMovies = async (pages, query) => {
  try {
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}
      `;
      const response = await axios.get(url);
      allMovies = allMovies.concat(response.data.results);
      const seriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}
      `;
      const seriesResponse = await axios.get(seriesUrl);
      allMovies = allMovies.concat(seriesResponse.data.results);
      allMovies.sort((a, b) => b.vote_count - a.vote_count);
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching Searched movies:", error);
    return [];
  }
};

export const fetchTopSeries = async (pages) => {
  try {
    let allShows = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      allShows = allShows.concat(response.data.results);
    }
    return allShows;
  } catch (error) {
    console.error("Error fetching top rated series:", error);
    return [];
  }
};

export const fetchPopularSeries = async (pages) => {
  try {
    let allShows = [];
    for (let page = 1; page <= pages; page++) {
      const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      allShows = allShows.concat(response.data.results);
    }
    return allShows;
  } catch (error) {
    console.error("Error fetching popular series:", error);
    return [];
  }
};
