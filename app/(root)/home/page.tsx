"use client";
import React, { useEffect, useState } from "react";
import Hero from "./hero";
import Trending from "./trending";
import { getCategory, getTrendingProducts } from "@/actions/fetchapi";
import WomenCollection from "./women-collection";
// import TrendingBlogs from "./trending-blogs";
import Testimonials from "./testimonials";
import { producttype } from "@/types/product";
import Category from "./category";
import { categoryType } from "@/types/category";

const HomeMain = () => {
  const [trendingproducts, setTrendingProducts] = useState<producttype[]>([]);
  const [category, setCategory] = useState<categoryType[]>([]);

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
  }, []); // runs only once on mount

  return (
    <>
      <Hero />
      <div className="max-w-7xl xl:mx-auto mx-4 my-20 space-y-20">
        <Category category={category} />
        {/* <TrendingBlogs /> */}
      </div>
      <Trending trendingproducts={trendingproducts} />
      <div className="max-w-7xl xl:mx-auto mx-4 my-20 space-y-20">
        <WomenCollection trendingproducts={trendingproducts} />
      </div>
      <Testimonials />
    </>
  );
};

export default HomeMain;
