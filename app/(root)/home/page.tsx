import React from "react";
import Hero from "./hero";
import Trending from "./trending";
import { getTrendingProducts } from "@/actions/fetchapi";
import WomenCollection from "./women-collection";
import TrendingBlogs from "./trending-blogs";
import Testimonials from "./testimonials";

const HomeMain = async () => {
  const trendingproducts = await getTrendingProducts();
  return (
    <>
      <Hero />
      <div className="max-w-7xl xl:mx-auto mx-4 my-20 space-y-20">
        <Trending trendingproducts={trendingproducts} />
        <WomenCollection trendingproducts={trendingproducts} />
        <TrendingBlogs />
      </div>
        <Testimonials />
    </>
  );
};

export default HomeMain;
