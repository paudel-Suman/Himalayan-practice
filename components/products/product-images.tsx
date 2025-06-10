"use client";
import { cn } from "@/lib/utils";
import { MediaType } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ media }: { media: MediaType[] }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={media[current]?.mediaUrl}
        alt="product image"
        height={1000}
        width={1000}
        className="h-[30em] object-contain object-center"
      />

      <div className="flex">
        {media.map((item, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === index && "border-orange-600"
            )}
          >
            <Image
              src={item.mediaUrl}
              alt="product-image"
              height={100}
              width={100}
              className="object-cover h-[7em]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
