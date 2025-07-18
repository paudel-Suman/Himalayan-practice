"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CreateContext = createContext();
const EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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
        typeof window !== "undefined" ? localStorage.getItem("token") : null,
    },
  });
  // On initial load, check for token + expiry
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");
      }
    }
  }, []);
  // Store token and user info on login
  const login = (user, token) => {
    const expiryTime = new Date().getTime() + EXPIRY_DURATION;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expiry", expiryTime.toString()); // 👈 Add this line

    setStore((prev) => ({
      ...prev,
      auth: { user, token },
    }));
  };

  // Clear token and user on logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setStore((prev) => ({
      ...prev,
      auth: { user: null, token: null },
    }));
  };

  const getCardItem = async () => {
    try {
      let savedCart = [];

      try {
        const cartString = localStorage.getItem("katunje-cart");

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
          "katunje-cart",
          JSON.stringify(cartData?.cart.items)
        );

        setCartCount(
          cartData.cart.items.reduce((sum, item) => sum + item.quantity, 0)
        );
      }

      return cartData?.cart.items || [];
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const savedWishlist =
          JSON.parse(localStorage.getItem("katunje-wishlist")) || [];
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const savedToken = localStorage.getItem("token");
        let savedCart = [];
        if (store?.auth?.token != null) {
          savedCart = await getCardItem();
        }

        setStore({
          wishlist: savedWishlist,
          cart: savedCart,
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
    const count = store.cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [store.cart]);
  return (
    <CreateContext.Provider
      value={{ store, setStore, login, logout, cartCount, setCartCount }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(CreateContext);
};
