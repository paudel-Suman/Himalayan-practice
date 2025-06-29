"use client";
import React, { useEffect, useState } from "react";
import Hero from "./hero";
import Trending from "./trending";
import { getCategory, getTrendingProducts } from "@/actions/fetchapi";
import WomenCollection from "./women-collection";
import Testimonials from "./testimonials";
import { producttype } from "@/types/product";
import Category from "./category";
import { categoryType } from "@/types/category";
import { bannerType } from "@/types/banner";
import { getBanner } from "@/actions/fetchbanner";
import Loading from "@/app/loading";
import { getTestimonials } from "@/actions/fetchtestimonials";
import { TestimonialType } from "@/types/testimonial";

const HomeMain = () => {
  const [trendingproducts, setTrendingProducts] = useState<producttype[]>([]);
  const [category, setCategory] = useState<categoryType[]>([]);
  const [testimonial, setTestimonial] = useState<TestimonialType[]>([]);
  const [banner, setBanner] = useState<bannerType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const products = await getTrendingProducts();
        setTrendingProducts(products);
      } catch (error) {
        console.error("Failed to fetch trending products:", error);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const products = await getCategory();
        setCategory(products);
      } catch (error) {
        console.error("Failed to fetch Category:", error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchtestimonial = async () => {
      try {
        const testimonials = await getTestimonials();
        setTestimonial(testimonials);
      } catch (error) {
        console.error("Failed to fetch Testimonials:", error);
      }
    };

    fetchtestimonial();
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true);
        const bannerinfo = await getBanner();
        const activeBanners = bannerinfo.filter(
          (banner: { isActive: boolean }) => banner.isActive === true
        );

        setBanner(activeBanners);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Hero banner={banner} />
      <div className="max-w-7xl xl:mx-auto mx-4 my-20 space-y-20">
        <Category category={category} />
      </div>
      <Trending trendingproducts={trendingproducts} />
      <div className="max-w-7xl xl:mx-auto mx-4 my-20 space-y-20">
        <WomenCollection trendingproducts={trendingproducts} />
        {/* <TrendingBlogs /> */}
      </div>
      <Testimonials testimonial={testimonial} />
    </>
  );
};

export default HomeMain;
