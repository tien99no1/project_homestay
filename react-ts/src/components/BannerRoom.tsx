import React, { Component } from "react";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,
        display: "block",
        position:'absolute', 
        right: '40px'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, 
        display: "block", 
        position:'absolute', 
        left: '0px',
        zIndex: '100' 
      }}
      onClick={onClick}
    />
  );
}

export default class BannerRoom extends Component {
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
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
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 0
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
        <div>
            <div className="img-room">
              <img src="https://cdn.luxstay.com/rooms/37700/large/IMG_2698.jpg" alt="" />
            </div>
        </div>
        <div>
            <div className="img-room">
              <img src="https://cdn.luxstay.com/rooms/37700/large/z1524272492025_605d495f57bc2c7b817fafb9bb5abbe8.jpg" alt="" />
            </div>
        </div>
        <div>
            <div className="img-room">
              <img src="https://cdn.luxstay.com/rooms/37700/large/IMG_2689.jpg" alt="" />
            </div>
        </div>
        <div>
            <div className="img-room">
              <img src="https://cdn.luxstay.com/rooms/37700/large/IMG_2705.jpg" alt="" />
            </div>
        </div>
        <div>
            <div className="img-room">
              <img src="https://cdn.luxstay.com/rooms/37700/large/IMG_2707.jpg" alt="" />
            </div>
        </div>
        <div>
            <div className="img-room">
              <img src="https://cdn.luxstay.com/rooms/37700/large/IMG_2708.jpg" alt="" />
            </div>
        </div>
        <div>
            <div className="img-room">
              <img src="https://cdn.luxstay.com/rooms/37700/large/IMG_2711.jpg" alt="" />
            </div>
        </div>
        </Slider>
      </div>
    );
  }
}
