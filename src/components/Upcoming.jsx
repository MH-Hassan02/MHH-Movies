import React from "react";
import { Link } from "react-router-dom";
import UpcomingCard from "./UpcomingCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="controlBtn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="controlBtn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-chevron-left"></i>
      </button>
    </div>
  );
};

const Upcoming = ({ items, title }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledItems = shuffleArray(items);
  const isSeries = title.toLowerCase().includes("shows");

  return (
    <>
      <div className="upcome">
        <div className="container">
          <div className="heading flexSB">
            <h1>{title}</h1>
            {isSeries ? (
              <Link to={`/Serieslist/${title}`}>View All</Link>
            ) : (
              <Link to={`/moviesList/${title}`}>View All</Link>
            )}
          </div>
          <div className="content" data-aos="fade-up" data-aos-duration="500">
            <Slider {...settings}>
              {shuffledItems.map((item) => (
                <UpcomingCard key={item.id} item={item} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upcoming;
