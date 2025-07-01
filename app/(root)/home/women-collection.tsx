"use client";
import ProductCard from "@/components/card/product-card";
import PageHeader from "@/components/text/page-header";
import { producttype } from "@/types/product";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef } from "react";
import Slider from "react-slick";

const WomenCollection = ({ featured }: { featured: producttype[] }) => {
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
    <div>
      <PageHeader title="Featured Products" />

      {featured.length > 4 ? (
        <section>
          <Slider {...settings} ref={sliderRef} className="my-8">
            {featured.map((item, index) => (
              <div key={index} className="px-4">
                <ProductCard products={item} />
              </div>
            ))}
          </Slider>

          <div className=" flex justify-center gap-2">
            <button
              onClick={handlePrev}
              className="cursor-pointer rounded-full border border-zinc-300 p-3 hover:scale-110 ease-in-out duration-300 text-xl"
            >
              <Icon icon="prime:arrow-left" />
            </button>
            <button
              onClick={handleNext}
              className="cursor-pointer rounded-full border border-zinc-300 p-3 hover:scale-110 ease-in-out duration-300 text-xl"
            >
              <Icon icon="prime:arrow-right" />
            </button>
          </div>
        </section>
      ) : (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 my-6">
          {featured.slice(0, 8).map((item, index) => (
            <div key={index}>
              <ProductCard products={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WomenCollection;
