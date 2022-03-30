import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

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
        <div>
          <Link to="/home/location">
            <div className="img-highlights">
              <img
                src="https://cdn.luxstay.com/home/location/location_1_1559734709.png"
                alt=""
              />
            </div>
            <div className="content">
              <div className="title">Hà Nội</div>
            </div>
          </Link>
        </div>
        <div>
          <div className="img-highlights">
            <img
              src="https://cdn.luxstay.com/home/location/location_5_1559735011.png"
              alt=""
            />
          </div>
          <div className="content">
            <div className="title">TP. Hồ Chí Minh</div>
          </div>
        </div>
        <div>
          <div className="img-highlights">
            <img
              src="https://cdn.luxstay.com/home/location/location_10_1559303118.png"
              alt=""
            />
          </div>
          <div className="content">
            <div className="title">Vũng Tàu</div>
          </div>
        </div>
        <div>
          <div className="img-highlights">
            <img
              src="https://cdn.luxstay.com/home/location/location_16_1559303173.png"
              alt=""
            />
          </div>
          <div className="content">
            <div className="title">Đà Nẵng</div>
          </div>
        </div>
        <div>
          <div className="img-highlights">
            <img
              src="https://cdn.luxstay.com/home/location/location_1_1559373089.png"
              alt=""
            />
          </div>
          <div className="content">
            <div className="title">Nha Trang</div>
          </div>
        </div>
        <div>
          <div className="img-highlights">
            <img
              src="https://cdn.luxstay.com/home/location/location_5_1559786196.png"
              alt=""
            />
          </div>
          <div className="content">
            <div className="title">Hạ Long</div>
          </div>
        </div>
        <div>
          <div className="img-highlights">
            <img
              src="https://cdn.luxstay.com/home/location/location_6_1559786202.png"
              alt=""
            />
          </div>
          <div className="content">
            <div className="title">Hội An</div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
