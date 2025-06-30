"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageHeader from "@/components/text/page-header";
import { TestimonialType } from "@/types/testimonial";
import TestimonialCard from "@/components/card/testimonial-card";

const Testimonials = ({ testimonial }: { testimonial: TestimonialType[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 400,
    speed: 3000,
    pauseOnHover: false,
    arrows: false,
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
        breakpoint: 900,
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

  return (
    <main className="bg-zinc-100 py-2">
      <div className="my-20 md:space-y-8 space-y-4 max-w-7xl lg:mx-auto mx-4">
        <PageHeader title="What our clients have to Say" />
        {testimonial.length > 2 ? (
          <Slider {...settings} className="my-10">
            {testimonial.map((item, index) => (
              <div key={index} className="px-4">
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-3">
            {testimonial.map((item, index) => (
              <div key={index} className="px-4">
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Testimonials;
