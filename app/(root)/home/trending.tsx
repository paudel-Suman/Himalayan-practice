"use client";
import PageHeader from "@/components/text/page-header";
import React, { useRef } from "react";
import ProductCard from "@/components/card/product-card";
import { producttype } from "@/types/product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Trending = ({
  trendingproducts,
}: {
  trendingproducts: producttype[];
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    dots: false,
    arrows: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };
  return (
    <div className="bg-gradient-to-tl from-primarymain via-primarymain/90 to-primarymain/80 py-10">
      <div className="max-w-7xl lg:mx-auto mx-4">
        <PageHeader title="Top Trends" className="text-white" />

        {trendingproducts.length > 4 ? (
          <section>
            <Slider {...settings} ref={sliderRef} className="my-10">
              {trendingproducts.map((item, index) => (
                <div key={index} className="px-4">
                  <ProductCard products={item} />
                </div>
              ))}
            </Slider>

            <div className=" flex justify-center gap-2">
              <button
                onClick={handlePrev}
                className="cursor-pointer rounded-full border bg-white border-zinc-300 p-3 hover:scale-110 ease-in-out duration-300 text-xl"
              >
                <Icon icon="prime:arrow-left" />
              </button>
              <button
                onClick={handleNext}
                className="cursor-pointer rounded-full border bg-white border-zinc-300 p-3 hover:scale-110 ease-in-out duration-300 text-xl"
              >
                <Icon icon="prime:arrow-right" />
              </button>
            </div>
          </section>
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 my-6">
            {trendingproducts.map((item, index) => (
              <div key={index}>
                <ProductCard products={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
