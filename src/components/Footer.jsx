import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footContainer">
          <div className="box">
            <ul className="flexli">
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Watch List</li>
            </ul>
            <p className="disclaimer">
              © MHH-Movies, 2024. All rights reserved. This website uses the
              TMDB API but is not endorsed or certified by TMDB. All movie
              information, including but not limited to titles, synopses,
              posters, and images, is provided by TMDB. © TMDB. All rights
              reserved. The TMDB logo and associated trademarks are property of
              TMDB. For more information about TMDB, please visit
              https://www.themoviedb.org/. All other content and design elements
              on this site are © © MHH-Movies, 2024. Unauthorized use and/or
              duplication of this material without express and written
              permission from this site's author and/or owner is strictly
              prohibited.
            </p>
            <p className="disclaimerShort">
              © MHH-Movies, 2024. All rights reserved.
            </p>
          </div>
          <div className="box">
            <h3>FOLLOW US</h3>
            <div className="flexi">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
            </div>
            <div className="flexi">
              <i className="fab fa-youtube"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
          <div className="box">
            <h3>MHH-Movies App</h3>
            <div className="img">
              <div className="footerLogo">
                <img src="https://img.icons8.com/color/48/000000/apple-app-store--v3.png" />
                <span>App Store</span>
              </div>
              <div className="footerLogo">
                <img src="https://img.icons8.com/fluency/48/000000/google-play.png" />
                <span>Google Play Store</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
