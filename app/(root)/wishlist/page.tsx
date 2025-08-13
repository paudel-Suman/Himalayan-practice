"use client";
import React, { useEffect, useState } from "react";
import { getWishlist } from "@/actions/fetchwishlist";
import { wishlistType } from "@/types/wishlist";
import WishlistCard from "@/components/card/wishlist-card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMyContext } from "../context/store";

const WishlistPage = () => {
  const { store, setStore } = useMyContext();
  const [wishlist, setWishlist] = useState<wishlistType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (store?.auth?.token) {
        const result = await getWishlist(store.auth.token);
        setWishlist(result);

        const updatedWishlistRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/wishlist/fetch-all-wishlist`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store?.auth?.token}`,
            },
          }
        );

        if (updatedWishlistRes.ok) {
          const wishlistData = await updatedWishlistRes.json();
          const activeWishlists = (wishlistData?.data?.wishlists || []).filter(
            (wishlist: wishlistType) => wishlist.isActive === true
          );

          setStore((prev: any) => ({
            ...prev,
            wishlist: activeWishlists,
          }));

          localStorage.setItem(
            "himalayan-wishlist",
            JSON.stringify(activeWishlists)
          );
        }
      } else {
        // Clear wishlist if no token (user is logged out)
        setWishlist([]);
        setStore((prev: any) => ({
          ...prev,
          wishlist: [],
        }));
        localStorage.removeItem("himalayan-wishlist");
      }
    };

    fetchData();
  }, [store?.auth?.token]);

  return (
    <main>
      <div className="my-8  max-w-7xl xl:mx-auto mx-4">
        {wishlist.length > 0 ? (
          <section>
            <h2 className="text-center font-semibold text-xl">My Wishlist</h2>

            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 md:gap-8 gap-4 my-12 ">
              {wishlist.map((item, index) => (
                <div key={index}>
                  <WishlistCard
                    products={item.product}
                    setWishlist={setWishlist}
                  />{" "}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="my-12 w-full">
            <div className="flex flex-col justify-center items-center space-y-6">
              <Image
                src="/empty-cart.png"
                alt="Empty Cart"
                width={400}
                height={400}
              />
              <div className="flex flex-col items-center space-y-4">
                <h2 className="font-bold  text-xl">
                  Ohh.. Your Wishlist is Empty
                </h2>
                <p className="font-medium text-zinc-500">
                  But it does not have to be now
                </p>
                <Link href={`/search`}>
                  <Button className="bg-primarymain px-10 py-4">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
