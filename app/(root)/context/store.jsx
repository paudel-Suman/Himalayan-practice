"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CreateContext = createContext();
const EXPIRY_DURATION = 24 * 60 * 60 * 1000; 

export const StoreProvider = ({ children }) => {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const [store, setStore] = useState({
    wishlist: [],
    cart: [],
    auth: {
      user: null,
      token:
        typeof window !== "undefined" ? localStorage.getItem("himalayan-token") : null,
    },
  });
  // On initial load, check for token + expiry
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("himalayan-token");
      const user = localStorage.getItem("user");
      const expiry = localStorage.getItem("expiry");

      const now = new Date().getTime();

      if (token && user && expiry && now < parseInt(expiry)) {
        setStore({
          auth: {
            user: JSON.parse(user),
            token,
          },
        });
      } else {
        localStorage.removeItem("himalayan-token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");
      }
    }
  }, []);

  const login = (user, token) => {
    const expiryTime = new Date().getTime() + EXPIRY_DURATION;

    localStorage.setItem("himalayan-token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expiry", expiryTime.toString()); 
    setStore((prev) => ({
      ...prev,
      auth: { user, token },
    }));
  };

  const logout = () => {
    localStorage.removeItem("himalayan-token");
    localStorage.removeItem("user");
    localStorage.removeItem("himalayan-cart");
    localStorage.removeItem("himalayan-wishlist");
    setStore({
      auth: { user: null, token: null },
      cart: [],
      wishlist: [],
    });

    setCartCount(0);
    setWishlistCount(0);
  };

  const getCardItem = async () => {
    try {
      let savedCart = [];

      try {
        const cartString = localStorage.getItem("himalayan-cart");

        if (cartString && cartString !== "undefined") {
          savedCart = JSON.parse(cartString);
        }
      } catch (error) {
        console.error("Error parsing saved cart:", error);
        savedCart = [];
      }

      if (!session && !store?.auth?.user) {
        return savedCart;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/cart/fetch-user-cart`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("No Data found");
      }

      const cartData = await response.json();

      if (cartData) {
        localStorage.setItem(
          "himalayan-cart",
          JSON.stringify(cartData?.cart?.items)
        );

        setCartCount(
          cartData?.cart?.items?.reduce((sum, item) => sum + item.quantity, 0)
        );
      }

      return cartData?.cart.items || [];
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  };
  const getWIshlistItem = async () => {
    try {
      let savedWishlist = [];

      try {
        const wishString = localStorage.getItem("himalayan-wishlist");

        if (wishString && wishString !== "undefined") {
          savedWishlist = JSON.parse(wishString);
        }
      } catch (error) {
        console.error("Error parsing saved wishlist:", error);
        savedWishlist = [];
      }

      if (!session && !store?.auth?.user) {
        return savedWishlist;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/wishlist/fetch-all-wishlist`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("No Data found");
      }

      const wishData = await response.json();
      const activeWishlists = (wishData?.data?.wishlists || []).filter(
        (wishlist) => wishlist.isActive === true
      );

      if (wishData) {
        localStorage.setItem(
          "himalayan-wishlist",
          JSON.stringify(activeWishlists || [])
        );
        const wishCount = activeWishlists?.length;

        setWishlistCount(wishCount);
      }

      return activeWishlists;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const savedToken = localStorage.getItem("himalayan-token");
        let savedCart = [];
        let savedWishlist = [];
        if (store?.auth?.token != null) {
          savedCart = await getCardItem();
          savedWishlist = await getWIshlistItem();
        }

        setStore({
          cart: savedCart,
          wishlist: savedWishlist,
          auth: {
            user: savedUser,
            token: savedToken,
          },
        });
      } catch (e) {
        console.error("Error loading data:", e);
      }
    };

    getData();
  }, [session]);


  useEffect(() => {
    const count = store?.cart?.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [store.cart]);

  useEffect(() => {
    const count = store.wishlist.length;
    setWishlistCount(count);
  }, [store.wishlist]);

  return (
    <CreateContext.Provider
      value={{
        store,
        setStore,
        login,
        logout,
        cartCount,
        setCartCount,
        wishlistCount,
        setWishlistCount,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(CreateContext);
};