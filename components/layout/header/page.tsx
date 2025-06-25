"use client";
import React, { useState } from "react";
import TopInfo from "./top-info";
import Image from "next/image";
import BottomCategory from "./bottom-category";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", searchTerm);
    router.push(`/search?${params.toString()}`);
  };
  return (
    <div className="bg-white relative">
      <TopInfo />
      <nav className="max-w-7xl mx-auto p-2 flex justify-between items-center">
        <Link href="/" className="md:hidden block">
          <Image
            src="/logo/mainlogo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="object-contain w-40"
          />
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            className="border border-zinc-400 rounded-full p-2 text-sm md:w-[350px] w-[150px] focus:border-blue-500 outline-none"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <figure className="md:absolute hidden left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src="/logo/mainlogo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="object-contain w-40"
            />
          </Link>
        </figure>

        <div className="md:flex hidden items-center gap-8">
          {navlinks.map((item, index) => (
            <Link href={item.path} key={index} className="font-medium">
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
      <BottomCategory />
    </div>
  );
};

export default Header;

const navlinks = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blogs",
    path: "/blogs",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
