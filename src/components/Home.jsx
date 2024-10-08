import React, { useEffect } from "react";
import HomeCard from "../components/HomeCard";
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

const Home = ({ items, playingItems }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledItems = items ? shuffleArray([...items]).slice(0, 5) : [];

  return (
    <>
      <div className="homeContainer">
        {items && items.length > 0 && (
          <>
            {shuffledItems.map((item) => (
              <HomeCard key={item.id} item={item} carousel={false} />
            ))}
          </>
        )}
        {playingItems && playingItems.length > 0 && (
          <div className="sliderContainerMain">
            <h2>Playing Now</h2>
              <Slider {...settings}>
                {playingItems.map((item) => (
                  <HomeCard key={item.id} item={item} carousel={true} />
                ))}
              </Slider>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
