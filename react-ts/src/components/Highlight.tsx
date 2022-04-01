import React, { Component, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import { CONFIG } from "../config";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        right: "40px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        left: "0px",
        zIndex: "100",
      }}
      onClick={onClick}
    />
  );
}

export default function Highlight() {
  const [location, setLocation] = useState<any>([]);

  const getLocation = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiAddress}`);
      setLocation(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    getLocation();
  }, []);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
          <Slider {...settings}>
            {location.map((local: any) => (
              <div key={local.id}>
              <Link to={`/home/location/${local.nameAddress}`}>
                <div className="img-highlights">
                  <img
                    src={local.img}
                    alt=""
                  />
                </div>
                <div className="content">
                  <div className="title">{local.nameAddress}</div>
                </div>
              </Link>
            </div>
            ))}  
          </Slider>
    </div>
  );
}
