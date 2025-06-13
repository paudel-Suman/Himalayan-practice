"use client";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../../context/store";
import { getWishlist } from "@/actions/fetchwishlist";
import { wishlistType } from "@/types/wishlist";
import WishlistCard from "@/components/card/wishlist-card";

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
    <div className="grid grid-cols-3 gap-8">
      {wishlist.map((item, index) => (
        <div key={index}>
          <WishlistCard products={item.product} />
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
