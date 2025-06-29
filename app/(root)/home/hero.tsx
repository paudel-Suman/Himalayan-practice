"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { bannerType } from "@/types/banner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  // Duplicate the banner if only one exists
  const slides = banner.length === 1 ? [...banner, banner[0]] : banner;

  return (
    <div className="md:h-[calc(100vh-17vh)] h-[50vh]">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index} className="relative">
            <figure>
              <Image
                src={item.image}
                alt="hero"
                width={1000}
                height={500}
                className="md:h-[calc(100vh-17vh)] h-[50vh] w-full object-cover "
              />
            </figure>

            <div className="bg-gradient-to-r from-black via-black/50 to-transparent w-full h-full absolute inset-0" />

            <div className="absolute top-1/2 -translate-y-1/2 lg:w-[40%] w-[80%] lg:left-32 left-4 text-white">
              <h2 className="md:text-4xl sm:text-2xl text-xl line-clamp-2 font-semibold">
                {item.title}
              </h2>
              <p className="text-zinc-200  md:line-clamp-4 line-clamp-2 md:my-6 my-4 md:text-base text-sm">
                {item.description}
              </p>
              <Link href={item.buttonLink} target="_blank">
                <Button className="bg-primarymain">{item.buttonText}</Button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
