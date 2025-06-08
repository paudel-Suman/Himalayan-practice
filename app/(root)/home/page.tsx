import React from "react";
import Hero from "./hero";
import Trending from "./trending";

const HomeMain = () => {
  return (
    <>
      <Hero />
      <div className="max-w-7xl xl:mx-auto mx-4 my-20 space-y-20">
        <Trending />
      </div>
    </>
  );
};

export default HomeMain;
