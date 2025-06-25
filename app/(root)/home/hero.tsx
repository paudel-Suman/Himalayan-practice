"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { bannerType } from "@/types/banner";

const Hero = ({ banner }: { banner: bannerType[] }) => {
  const settings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    waitForAnimate: false,
    pauseOnHover: false,
    arrows: false,
  };
  return (
    <div className="md:min-h-screen h-[50vh]">
      <Slider {...settings}>
        {banner.map((item, index) => (
          <div key={index}>
            <figure >
              <Image
                src={item.image}
                alt="hero"
                width={1000}
                height={500}
                className="md:h-screen h-[50vh] w-full object-cover "
              />
            </figure>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
