import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchSearchedMovies } from "../../movies";
import Upcoming from "./Upcoming";
import logo from "../../images/logo.jpg";

const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState("Home");
  const [mouseHoverMovies, setMouseHoverMovies] = useState(false);
  const [mouseHoverSeries, setMouseHoverSeries] = useState(false);

  const toggleSearchBar = () => {
    const searchBar = document.querySelector(".searchBar");
    searchBar.classList.toggle("visible");
    setSearchValue("");
  };

  const getSearchValue = async () => {
    const moviesData = await fetchSearchedMovies(1, searchValue);
    toggleSearchBar();
    if (Mobile) {
      setMobile(!Mobile);
      const searchBar = document.querySelector(".searchBar");
      searchBar.classList.toggle("visible");
    }
    navigate(`/moviesList/searched/${searchValue}`, { state: { moviesData } });
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const showDropDownMovies = async () => {
    setMouseHoverMovies(true);
  };

  const removeDropDownMovies = async () => {
    setMouseHoverMovies(false);
  };

  const showDropDownSeries = async () => {
    setMouseHoverSeries(true);
  };

  const removeDropDownSeries = async () => {
    setMouseHoverSeries(false);
  };

  useEffect(() => {
    AOS.refresh();
  }, [Mobile]);

  return (
    <>
      <header>
        <div className="container flexSB">
          <nav className="flexSB">
            <div className="logo">
              <Link to="/" onClick={() => setPage("Home")}>
                <img src={`${logo}`} alt="" />
              </Link>
            </div>

            <ul className={Mobile ? "navMenuList" : "flexSB"}>
              {Mobile ? (
                <div className="searchBarMobile">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        getSearchValue();
                      }
                    }}
                  />
                  <i className="fa fa-search" onClick={getSearchValue}></i>
                </div>
              ) : null}

              <Link
                to="/"
                onClick={() => {
                  setPage("Home");
                  {
                    Mobile ? setMobile(!Mobile) : null;
                  }
                }}
                className={page === "Home" && !Mobile ? "active" : ""}
              >
                <span>Home</span>
              </Link>

              <Link
                to="/SeriesList/Popular Series"
                onClick={() => {
                  setPage("Series");
                  {
                    Mobile ? setMobile(!Mobile) : null;
                  }
                }}
                className={page === "Series" && !Mobile ? "active" : ""}
                onMouseEnter={!Mobile && showDropDownSeries}
                onMouseLeave={!Mobile && removeDropDownSeries}
              >
                <span>Series</span>

                <ul
                  className={` ${"dropDownMobile"} ${Mobile ? "visible" : ""}`}
                >
                  <Link to="/SeriesList/Popular Series">
                    <li>- Popular Series</li>
                  </Link>
                  <Link to="/SeriesList/Top Rated Series">
                    <li>- Top Rated Series</li>
                  </Link>
                </ul>
              </Link>

              <Link
                to="/moviesList/Popular Movies"
                onClick={() => {
                  setPage("Movies");
                  {
                    Mobile ? setMobile(!Mobile) : null;
                  }
                }}
                className={page === "Movies" && !Mobile ? "active" : ""}
                onMouseEnter={!Mobile && showDropDownMovies}
                onMouseLeave={!Mobile && removeDropDownMovies}
              >
                <span>Movies</span>

                <ul
                  className={` ${"dropDownMobile"} ${Mobile ? "visible" : ""}`}
                >
                  <Link to="/moviesList/Popular Movies">
                    <li>- Popular Movies</li>
                  </Link>
                  <Link to="/moviesList/Top Rated Movies">
                    <li>- Top Rated Movies</li>
                  </Link>
                </ul>
              </Link>

              <Link
                to="/pages"
                onClick={() => {
                  setPage("Pages");
                  {
                    Mobile ? setMobile(!Mobile) : null;
                  }
                }}
                className={page === "Pages" && !Mobile ? "active" : ""}
              >
                <span>Pages</span>
              </Link>

              <Link
                to="/pricing"
                onClick={() => {
                  setPage("Pricing");
                  {
                    Mobile ? setMobile(!Mobile) : null;
                  }
                }}
                className={page === "Pricing" && !Mobile ? "active" : ""}
              >
                <span>Pricing</span>
              </Link>

              <Link
                to="/contact"
                onClick={() => {
                  setPage("Contact");
                  {
                    Mobile ? setMobile(!Mobile) : null;
                  }
                }}
                className={page === "Contact" && !Mobile ? "active" : ""}
              >
                <span>Contact</span>
              </Link>
            </ul>

            <button
              className={Mobile ? "toggleSide" : "toggle"}
              onClick={() => setMobile(!Mobile)}
            >
              {Mobile ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </nav>

          <div
            className={`${"dropDownBoxMovies"} ${
              mouseHoverMovies ? "visible" : ""
            }`}
            onMouseEnter={showDropDownMovies}
            onMouseLeave={removeDropDownMovies}
            onClick={() => setPage("Movies")}
          >
            <ul>
              <Link to="/moviesList/Popular Movies">
                <li>Popular</li>
              </Link>
              <Link to="/moviesList/Top Rated Movies">
                <li>Top Rated</li>
              </Link>
              <Link to="/moviesList/Recommended Movies">
                <li>Recommended</li>
              </Link>
              <Link to="/moviesList/Upcoming Movies">
                <li>Upcoming</li>
              </Link>
              <Link to="/moviesList/Playing Movies">
                <li>Playing Now</li>
              </Link>
            </ul>
          </div>

          <div
            className={`${"dropDownBoxSeries"} ${
              mouseHoverSeries ? "visible" : ""
            }`}
            onMouseEnter={showDropDownSeries}
            onMouseLeave={removeDropDownSeries}
            onClick={() => setPage("Series")}
          >
            <ul>
              <Link to="/SeriesList/Popular Series">
                <li>Popular</li>
              </Link>
              <Link to="/SeriesList/Top Rated Series">
                <li>Top Rated</li>
              </Link>
            </ul>
          </div>

          <div className="searchBar">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getSearchValue();
                }
              }}
            />
            <i className="fa fa-search" onClick={getSearchValue}></i>
          </div>

          <div className="account">
            <i onClick={toggleSearchBar} className="fa fa-search"></i>
            <i className="fa fa-bell"></i>
            <i className="fa fa-user"></i>
            <button>Subscribe Now</button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
