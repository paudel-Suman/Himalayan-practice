"use client";
import React from "react";
import TopInfo from "./top-info";
import Image from "next/image";
import BottomCategory from "./bottom-category";
import Link from "next/link";
import Headroom from "react-headroom";

const Header = () => {
  return (
    <Headroom>
      <div className="bg-white relative">
        <TopInfo />
        <nav className="max-w-7xl mx-auto p-2 flex justify-between items-center">
          <div>
            <input
              className="border border-zinc-400 rounded-full p-2 text-sm w-[350px] focus:border-blue-500 outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
          <figure className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo/mainlogo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="object-contain w-40"
            />
          </figure>

          <div className="flex items-center gap-8">
            {navlinks.map((item, index) => (
              <Link href={item.path} key={index} className="font-medium">
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        <BottomCategory />
      </div>
    </Headroom>
  );
};

export default Header;

const navlinks = [
  {
    title: "About",
    path: "/",
  },
  {
    title: "Blogs",
    path: "/",
  },
  {
    title: "Contact",
    path: "/",
  },
];
