import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingBag, Star } from "lucide-react";
import { producttype } from "@/types/product";

const ProductDetailCard = ({ products }: { products: producttype }) => {
  const { featureImage, name, rating, price, slug, description } = products;

  return (
    <div>
      {" "}
      <Link
        href={`/product/${slug}`}
        key={slug}
        className="group p-2 group hover:bg-zinc-50 shadow-sm border border-black/10 rounded-md relative grid grid-cols-3 items-center gap-4"
      >
        <figure className="relative overflow-hidden md:h-[15em] h-[12em]">
          {/* Default image (index 0) */}
          <Image
            src={featureImage}
            alt={name}
            width={1000}
            height={1000}
            className="h-full w-full object-cover rounded-md"
          />
        </figure>

        <div className="col-span-2 md:space-y-3 space-y-2">
          <h2 className="font-semibold md:text-lg line-clamp-2 text-sm">
            {name}
          </h2>
          <p className="font-medium text-xs line-clamp-3 text-zinc-500">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(rating || 4)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-500 text-yellow-500"
                />
              ))}
              <Star className="h-5 w-5 text-gray-300" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <p className="text-xl font-semibold text-red-500">{price}.00</p>
            <del className="text-sm  font-semibold">180.00</del>
          </div>

          <div className="flex gap-2 items-center">
            <Button className="flex items-center cursor-pointer bg-primarymain text-white hover:bg-primarymain/90">
              <ShoppingBag className="h-4 w-4" />
              ADD TO CART
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductDetailCard;
