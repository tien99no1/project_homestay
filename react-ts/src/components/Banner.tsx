import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Photo1 from "../images/banner1.png";
import Photo2 from "../images/banner2.png";
import Photo3 from "../images/banner3.png";

const images = [Photo1, Photo2, Photo3];

export default function Banner() {
  const settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    speed: 1000,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <div>
      <Slider {...settings} className="Silder-Banner">
        {images.map((image: string, index: number) => {
          return (
            <div key={index} style={{ borderRadius: "0.7rem" }}>
              <img 
                src={image}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.7rem",
                }}
                alt=""
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
