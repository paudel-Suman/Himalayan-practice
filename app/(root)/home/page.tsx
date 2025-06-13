"use client";
import React, { useEffect, useState } from "react";
import Hero from "./hero";
import Trending from "./trending";
import { getTrendingProducts } from "@/actions/fetchapi";
import WomenCollection from "./women-collection";
// import TrendingBlogs from "./trending-blogs";
import Testimonials from "./testimonials";
import { producttype } from "@/types/product";

const HomeMain = () => {
  const [trendingproducts, setTrendingProducts] = useState<producttype[]>([]);

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
  }, []); // runs only once on mount

  return (
    <>
      <Hero />
      <div className="max-w-7xl xl:mx-auto mx-4 my-20 space-y-20">
        <Trending trendingproducts={trendingproducts} />
        <WomenCollection trendingproducts={trendingproducts} />
        {/* <TrendingBlogs /> */}
      </div>
      <Testimonials />
    </>
  );
};

export default HomeMain;
