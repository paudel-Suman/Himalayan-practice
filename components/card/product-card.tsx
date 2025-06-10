import { producttype } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ products }: { products: producttype }) => {
  const { featureImage, name, rating, price, slug } = products;
  return (
    <Link href={`/product/${slug}`}>
      <div className="border border-black/10 shadow-sm rounded-md p-2">
        <figure className="">
          <Image
            src={featureImage}
            alt={name}
            width={1000}
            height={1000}
            priority
            className="h-[20em] object-cover rounded-md"
          />
        </figure>
        <div className="p-2 space-y-2">
          <h2 className="font-semibold text-base line-clamp-1 ">{name}</h2>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-primary text-lg">Rs.{price}</h2>
            <del className="font-medium  text-lighttext">Rs.{price}</del>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(rating || 5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
