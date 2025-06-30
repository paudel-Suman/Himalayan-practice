import PageHeader from "@/components/text/page-header";
import { categoryType } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = ({ category }: { category: categoryType[] }) => {
  return (
    <div>
      <PageHeader title="Explore Our Category" />

      <div className="sm:flex grid grid-cols-2 flex-wrap gap-6 my-8 justify-center">
        {category.slice(0, 8).map((item, index) => (
          <Link
            href={`/search?categoryId=${item.id}`}
            key={index}
            className="relative group cursor-pointer"
          >
            <div className="sm:w-[15em] absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-md" />
            <figure className="rounded-md">
              <Image
                src={item?.image}
                alt={item.name}
                width={1000}
                height={1000}
                className="sm:h-[10em] h-[8em] sm:w-[15em] object-cover rounded-md group-hover:border-2 group-hover:border-red-600 group-hover:sclae-125 ease-in-out duration-200"
              />
            </figure>
            <div className="absolute left-4 bottom-4 text-white">
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
