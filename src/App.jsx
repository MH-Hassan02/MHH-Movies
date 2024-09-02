import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import HomePages from "./Home/HomePages";
import Footer from "./components/Footer";
import SinglePage from "./components/SinglePage";
import MoviesPage from "./components/MoviesPage";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import Pages from "./components/Pages";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  window.addEventListener("unload", function (event) {
    localStorage.removeItem("id");
  });
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
          <Routes>
            <Route exact path="/" element={<HomePages />} />
            <Route exact path="/movies/:id" element={<SinglePage />} />
            <Route exact path="/series/:id" element={<SinglePage />} />
            <Route exact path="/moviesList/:type" element={<MoviesPage />} />
            <Route exact path="/SeriesList/:type" element={<MoviesPage />} />
            <Route exact path="/moviesList/searched/:searchValue" element={<MoviesPage />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/pages" element={<Pages />} />
            {/* <Route exact path="/movies" element={<MoviesPage />} /> */}
          </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;