import React, { Component } from "react";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import Photo1 from '../images/banner1.png'
import Photo2 from '../images/banner2.png'
import Photo3 from '../images/banner3.png'

export default class Banner extends Component {
  render() {
    const settings = {
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      speed: 1000,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
      cssEase: "linear"
    };
    return (
      <div>
        <Slider {...settings}>
         <div style={{borderRadius: '0.7rem'}}>
           <img src={Photo1} style={{width: '100%', height: '100%', borderRadius: '0.7rem'}} alt='banner1'/>
         </div>
         <div style={{borderRadius: '0.7rem'}}>
           <img src={Photo2} style={{width: '100%', height: '100%', borderRadius: '0.7rem'}} alt='banner2'/>
         </div>
         <div style={{borderRadius: '0.7rem'}}>
           <img src={Photo3} style={{width: '100%', height: '100%', borderRadius: '0.7rem'}} alt='banner3'/>
         </div>
        </Slider>
      </div>
    );
  }
}

