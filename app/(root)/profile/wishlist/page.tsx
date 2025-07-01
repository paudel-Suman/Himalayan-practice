"use client";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../../context/store";
import { getWishlist } from "@/actions/fetchwishlist";
import { wishlistType } from "@/types/wishlist";
import WishlistCard from "@/components/card/wishlist-card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  const { store } = useMyContext();
  const [wishlist, setWishlist] = useState<wishlistType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (store?.auth?.token) {
        const result = await getWishlist(store.auth.token);
        setWishlist(result);
        console.log("result", result);
      }
    };
    fetchData();
  }, [store?.auth?.token]);

  return (
    <div>
      {wishlist.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {wishlist.map((item, index) => (
            <div key={index}>
              <WishlistCard products={item.product} />
            </div>
          ))}
        </div>
      ) : (
        <div className=" w-full">
          <div className="flex flex-col justify-center items-center space-y-3">
            <Image
              src="/empty-cart.png"
              alt="Empty Cart"
              width={400}
              height={400}
            />
            <div className="flex flex-col items-center space-y-4">
              <h2 className="font-bold md:text-2xl text-xl">
                Ohh.. Your Wishlist is Empty
              </h2>
              <p className="font-medium text-zinc-500">
                But it doesn't have to be now
              </p>
              <Link href={`/`}>
                <Button className="bg-primarymain px-10 py-4">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
