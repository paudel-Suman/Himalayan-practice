"use client";
import React, { useEffect, useState } from "react";
import TopInfo from "./top-info";
import Image from "next/image";
import BottomCategory from "./bottom-category";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCompanyInfo } from "@/actions/fetchcompanydata";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [company, setCompany] = useState<any>(null);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", searchTerm);
    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const comp = await getCompanyInfo();
        console.log(comp);
        setCompany(comp);
      } catch (error) {
        console.error("Failed to fetch Company:", error);
      }
    };

    fetchCompany();
  }, []);
  return (
    <div className="bg-white relative">
      <TopInfo />
      <nav className="max-w-7xl mx-auto p-2 flex justify-between items-center">
        {company && (
          <Link href="/" className="md:hidden block">
            <Image
              src={company.logoUrl}
              alt="logo"
              width={1000}
              height={1000}
              className="object-contain h-10 w-fit"
            />
          </Link>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="border border-zinc-400 rounded-full p-2 text-sm lg:w-[350px] md:w-[200px] w-[150px] focus:border-blue-500 outline-none"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        {company && (
          <figure className="md:block hidden absolute  left-1/2 -translate-x-1/2">
            <Link href="/">
              <Image
                src={company.logoUrl}
                alt="logo"
                width={1000}
                height={1000}
                className="object-contain h-[3em]"
              />
            </Link>
          </figure>
        )}

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
