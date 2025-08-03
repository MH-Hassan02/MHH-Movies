import React, { useState, useEffect, useCallback } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchSearchedMovies } from "../../movies";
import logo from "../../images/logo.jpg";

const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState("Home");
  const [mouseHoverMovies, setMouseHoverMovies] = useState(false);
  const [mouseHoverSeries, setMouseHoverSeries] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (query.trim().length >= 2) {
            setIsSearching(true);
            try {
              const moviesData = await fetchSearchedMovies(1, query);
              const limitedSuggestions = moviesData.slice(0, 5);
              setSearchSuggestions(limitedSuggestions);
              setShowSuggestions(true);
            } catch (error) {
              console.error("Error fetching suggestions:", error);
              setSearchSuggestions([]);
            } finally {
              setIsSearching(false);
            }
          } else {
            setSearchSuggestions([]);
            setShowSuggestions(false);
          }
        }, 300);
      };
    })(),
    []
  );

  const getSearchValue = async () => {
    const moviesData = await fetchSearchedMovies(1, searchValue);
    if (Mobile) {
      setMobile(!Mobile);
    }
    setShowSuggestions(false);
    navigate(`/moviesList/searched/${searchValue}`, { state: { moviesData } });
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue("");
    setShowSuggestions(false);
    setShowMobileSearch(false);
    setShowSearchBar(false);
    navigate(`/movies/${suggestion.id}/${suggestion.title}`);
  };

  const handleSearchContainerClick = () => {
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const searchContainer = document.querySelector(".searchContainer");
  //     const mobileSearchBar = document.querySelector(".mobileSearchBar");
  //     const mobileSearchIcon = document.querySelector(".mobileSearchIcon");

  //     if (searchContainer && !searchContainer.contains(event.target)) {
  //       setShowSuggestions(false);
  //     }

  //     if (
  //       mobileSearchBar &&
  //       !mobileSearchBar.contains(event.target) &&
  //       !mobileSearchIcon?.contains(event.target)
  //     ) {
  //       setShowMobileSearch(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
      <header className={isHomePage ? "" : "header-absolute"}>
        <div className="navContainer flexSB">
          <nav className="flexSB">
            <div className="logo">
              <Link to="/" onClick={() => setPage("Home")}>
                <img src={`${logo}`} alt="" />
              </Link>
            </div>

            <ul className={Mobile ? "navMenuList" : "flexSB"}>
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
                onMouseEnter={!Mobile ? showDropDownSeries : undefined}
                onMouseLeave={!Mobile ? removeDropDownSeries : undefined}
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
                onMouseEnter={!Mobile ? showDropDownMovies : undefined}
                onMouseLeave={!Mobile ? removeDropDownMovies : undefined}
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

          {/* Mobile Search Icon */}
          {!Mobile && (
            <div className="mobileSearchIcon">
              <i
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className={showMobileSearch ? `fa fa-times` : `fa fa-search`}
              ></i>
            </div>
          )}

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

          <div className="searchContainer" onClick={handleSearchContainerClick}>
            <i
              onClick={() => setShowSearchBar(!showSearchBar)}
              className={showSearchBar ? `fa fa-times` : `fa fa-search`}
            ></i>
            <div
              className={`searchInput ${
                showSearchBar ? "searchInputVisible" : ""
              }`}
            >
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    getSearchValue();
                    setShowSuggestions(false);
                    setShowSearchBar(false);
                  }
                }}
                placeholder="Search movies and series..."
              />
              <i className="fa fa-search" onClick={getSearchValue}></i>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (
              <div className="searchSuggestions">
                {isSearching ? (
                  <div className="searchingIndicator">
                    <i className="fa fa-spinner fa-spin"></i>
                    <span>Searching...</span>
                  </div>
                ) : searchSuggestions.length > 0 ? (
                  <div className="suggestionsList">
                    {searchSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="suggestionItem"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="suggestionContent">
                          <div className="suggestionImage">
                            <img
                              src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                              alt={suggestion.title}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/92x138?text=No+Image";
                              }}
                            />
                          </div>
                          <div className="suggestionDetails">
                            <h4>{suggestion.title}</h4>
                            <div className="suggestionMeta">
                              <span className="suggestionYear">
                                {suggestion.release_date?.split("-")[0] ||
                                  suggestion.first_air_date?.split("-")[0] ||
                                  "N/A"}
                              </span>
                              <span className="suggestionRating">
                                <i className="fa fa-star"></i>
                                {suggestion.vote_average?.toFixed(1) || "N/A"}
                              </span>
                              <span className="suggestionVotes">
                                <i className="fa fa-users"></i>
                                {suggestion.vote_count?.toLocaleString() ||
                                  "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchValue.trim().length >= 2 ? (
                  <div className="noResults">
                    <span>No results found</span>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="mobileSearchBar">
          <div className="mobileSearchInput">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getSearchValue();
                  setShowSuggestions(false);
                  setShowMobileSearch(false);
                }
              }}
              placeholder="Search movies and series..."
            />
            <i className="fa fa-search" onClick={getSearchValue}></i>
          </div>

          {/* Mobile Search Suggestions */}
          {showSuggestions && (
            <div className="mobileSearchSuggestions">
              {isSearching ? (
                <div className="searchingIndicator">
                  <i className="fa fa-spinner fa-spin"></i>
                  <span>Searching...</span>
                </div>
              ) : searchSuggestions.length > 0 ? (
                <div className="suggestionsList">
                  {searchSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="suggestionItem"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="suggestionContent">
                        <div className="suggestionImage">
                          <img
                            src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                            alt={suggestion.title}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/92x138?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="suggestionDetails">
                          <h4>{suggestion.title}</h4>
                          <div className="suggestionMeta">
                            <span className="suggestionYear">
                              {suggestion.release_date?.split("-")[0] ||
                                suggestion.first_air_date?.split("-")[0] ||
                                "N/A"}
                            </span>
                            <span className="suggestionRating">
                              <i className="fa fa-star"></i>
                              {suggestion.vote_average?.toFixed(1) || "N/A"}
                            </span>
                            <span className="suggestionVotes">
                              <i className="fa fa-users"></i>
                              {suggestion.vote_count?.toLocaleString() || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchValue.trim().length >= 2 ? (
                <div className="noResults">
                  <span>No results found</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Header;
