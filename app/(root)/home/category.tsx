import PageHeader from "@/components/text/page-header";
import { categoryType } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = ({ category }: { category: categoryType[] }) => {
  return (
    <div>
      <PageHeader title="Main Category" />

      <div className="sm:flex grid grid-cols-2 flex-wrap gap-6 my-8 justify-center">
        {category.slice(0, 8).map((item, index) => (
          <Link
            href={`/search?categoryId=${item.id}`}
            key={index}
            className="relative group cursor-pointer"
          >
            {/* <div className="sm:w-[15em] absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-md" /> */}
            <figure className="rounded-md overflow-hidden brightess-50 border shadow-sm">
              <Image
                src={item?.image}
                alt={item.name}
                width={2000}
                height={2000}
                className="sm:h-[10em] h-[8em] sm:w-[12em] object-contain  rounded-md   group-hover:scale-125 ease-in-out duration-200"
              />
            </figure>

            <h2 className="text-center font-medium text-xs text-lighttext mt-4">
              {item.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
