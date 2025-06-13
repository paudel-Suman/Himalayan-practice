"use client";
import { producttype } from "@/types/product";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { redirect, usePathname } from "next/navigation";
import { useMyContext } from "@/app/(root)/context/store";

const ProductCard = ({ products }: { products: producttype }) => {
  const { featureImage, name, rating, price, slug } = products;
  const pathname = usePathname();
  const { store } = useMyContext();
  const [wishlisted, setWishlisted] = useState(false);

  const addToWishlist = async (data: producttype) => {
    if (!store.auth.token) {
      toast.error("Please login to add product to wishlist.");
      redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/wishlist/add-wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
          body: JSON.stringify({
            productId: data.id,
          }),
        }
      );

      const result = await response.json();
      setWishlisted(result.wishlist.isActive);

      if (!response.ok) throw new Error(result.message || "Failed to update");

      toast.success("Wishlist updated successfully.");
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  
  return (
    <Link href={`/product/${slug}`}>
      <div className="bg-white relative border border-black/10 shadow-sm rounded-md p-2 group hover:bg-zinc-100 hover:border-primarymain/50">
        <figure className="overflow-hidden rounded-md">
          <Image
            src={featureImage}
            alt={name}
            width={1000}
            height={1000}
            priority
            className="h-[20em] object-cover group-hover:scale-110 ease-in-out duration-300"
          />
        </figure>

        <div className="absolute top-4 right-4 hidden group-hover:block opacity-0 group-hover:opacity-100 ease-in-out duration-300">
          <Button
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              addToWishlist(products);
            }}
            className={`h-9 w-9 rounded-full cursor-pointer shadow-md transition-colors
    ${
      wishlisted
        ? "bg-rose-600 text-white"
        : "bg-white text-black hover:bg-rose-600 hover:text-white"
    }
  `} // onClick={(e) => {
            //   e.preventDefault();
            //   addToWishlist(product);
            // }}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>

        {/* product descriptions */}
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
