"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CreateContext = createContext();

export const StoreProvider = ({ children }) => {
  const { data: session } = useSession();
  const [store, setStore] = useState({
    wishlist: [],
    cart: [],
    auth: {
      user: null,
      token:
        typeof window !== "undefined" ? localStorage.getItem("token") : null,
    },
  });

  // Store token and user info on login
  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
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
        localStorage.setItem("katunje-cart", JSON.stringify(cartData?.items));
      }

      return cartData?.items || [];
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

  return (
    <CreateContext.Provider value={{ store, setStore, login, logout }}>
      {children}
    </CreateContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(CreateContext);
};
