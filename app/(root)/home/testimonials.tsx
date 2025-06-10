"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import PageHeader from "@/components/text/page-header";

const Testimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 400,
    speed: 4000,
    cssEase: "linear",
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
  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 400,
    speed: 4000,
    cssEase: "linear",
    rtl: true,
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
    <main className="bg-zinc-50 py-2">
      <div className="my-20 md:space-y-8 space-y-4 max-w-7xl lg:mx-auto mx-4">
        <PageHeader title="What our clients have to Say" />
        <Slider {...settings} className="my-10">
          {testimonialsdata.map((item, index) => (
            <div key={index} className="px-4">
              <div className="p-4 rounded-md shadow-md border">
                <div className="">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.img}
                        width={1000}
                        height={1000}
                        alt="testimonials"
                        className="rounded-full h-14 w-14 border border-green-500 object-cover"
                      />

                      <div>
                        <h2 className="font-semibold md:text-base text-sm">
                          {item.name}
                        </h2>
                        <h2 className="md:text-sm text-xs">
                          {item.designation}
                        </h2>
                      </div>
                    </div>
                    <Icon
                      icon="flat-color-icons:google"
                      width="30"
                      height="30"
                    />
                  </div>
                </div>
                <p className="my-4 sm:text-sm text-xs text-zinc-700">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </Slider>

        <Slider {...settings2}>
          {testimonialsdata.map((item, index) => (
            <div key={index} className="px-4">
              <div className="p-4 rounded-md shadow-md border">
                <div className="">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.img}
                        width={1000}
                        height={1000}
                        alt="testimonials"
                        className="rounded-full h-14 w-14 border border-green-500 object-cover"
                      />

                      <div>
                        <h2 className="font-semibold md:text-base text-sm">
                          {item.name}
                        </h2>
                        <h2 className="md:text-sm text-xs">
                          {item.designation}
                        </h2>
                      </div>
                    </div>
                    <Icon
                      icon="flat-color-icons:google"
                      width="30"
                      height="30"
                    />
                  </div>
                </div>
                <p className="my-4 sm:text-sm text-xs text-zinc-700">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </main>
  );
};

export default Testimonials;

const testimonialsdata = [
  {
    img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Aarav Sharma",
    designation: "Verified Trekker",
    message:
      "Katunje provided me with top-quality trekking gear that made my Annapurna circuit trek safe and comfortable. The products are reliable and built for adventure!",
  },
  {
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Sneha Thapa",
    designation: "Mountain Enthusiast",
    message:
      "I love the range of gear Katunje offers. From jackets to backpacks, everything is durable and perfect for high-altitude treks. Highly recommended for all trekkers!",
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Ramesh Khatri",
    designation: "Adventure Seeker",
    message:
      "Katunje is my go-to store for trekking essentials. Their gear withstood tough Himalayan conditions and kept me going. Exceptional quality and service!",
  },
  {
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Nisha Gurung",
    designation: "Frequent Trekker",
    message:
      "Shopping with Katunje has transformed my trekking experience. The fit, comfort, and performance of their gear are top-notch. Loyal customer for life!",
  },
];
