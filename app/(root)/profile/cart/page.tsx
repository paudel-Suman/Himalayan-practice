"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useMyContext } from "../../context/store";
import { Cart } from "@/types/cart";
import SpinLoader from "@/app/spin-loader";

const CartProfilePage = () => {
  const { store, setStore } = useMyContext();

  const [cart, setCart] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);

  // Increase quantity
  const increaseQuantity = (
    productId: string,
    selectedColorId: string,
    selectedSizeId: string
  ) => {
    const updatedCart = cart.map((item) => {
      if (
        item.productId === productId &&
        item.selectedColorId === selectedColorId &&
        item.selectedSizeId === selectedSizeId
      ) {
        const newQuantity = item.quantity + 1;
        // Check if stock is available
        if (newQuantity <= item.product.stock.quantity) {
          return { ...item, quantity: newQuantity };
        } else {
          toast.error(
            `Cannot add more. Only ${item.product.stock.quantity} items in stock.`
          );
          return item;
        }
      }
      return item;
    });
    setCart(updatedCart);
    setStore({ ...store, cart: updatedCart });
    localStorage.setItem("katunje-cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (
    productId: string,
    selectedColorId: string,
    selectedSizeId: string
  ) => {
    const updatedCart = cart.map((item) => {
      if (
        item.productId === productId &&
        item.selectedColorId === selectedColorId &&
        item.selectedSizeId === selectedSizeId
      ) {
        const newQuantity = item.quantity - 1;
        // Prevent quantity from going below 1
        if (newQuantity >= 1) {
          return { ...item, quantity: newQuantity };
        } else {
          toast.error("Quantity cannot be less than 1.");
          return item;
        }
      }
      return item;
    });

    setCart(updatedCart);
    setStore({ ...store, cart: updatedCart });
    localStorage.setItem("katunje-cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/cart/fetch-user-cart`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store?.auth?.token}`,
            },
          }
        );

        const data = await res.json();
        if (!res.ok) {
          if (data?.cart === null) {
            setCart([]);
            return;
          }
          throw new Error(data.message || "Failed to fetch cart");
        }
        setCart(data?.cart?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserCart();
  }, []);
  const handleDelete = async (cartId: string) => {
    const previousCart = [...cart];
    const updatedCart = cart.filter((item) => item.id !== cartId);
    setCart(updatedCart);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/cart/delete-cart-item/${cartId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete cart item");
      }

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      setCart(previousCart);
      toast.error("Failed to delete item from cart");
    }
  };

  if (loading) return <SpinLoader />;

  return (
    <main>
      <section>
        {cart.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-center my-4">
              My Cart
            </h2>
            <div className="p-4">
              <div className="space-y-4 ">
                {cart.map((item: Cart) => (
                  <div
                    key={`${item.id}`}
                    className="grid sm:grid-cols-5  border p-4 rounded-md  py-4"
                  >
                    <div className="sm:col-span-3 col-span-full">
                      <div className="flex items-center gap-4">
                        <figure>
                          <Image
                            src={
                              item.product.featureImage || "/placeholder.png"
                            }
                            alt={item.product.name || "Product Image"}
                            width={100}
                            height={100}
                            className="h-32 w-32 object-cover rounded-md"
                          />
                        </figure>

                        <div className="space-y-2">
                          <h2 className="font-semibold">{item.product.name}</h2>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-zinc-500">
                                $ {item.product.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="sm:text-sm text-xs font-medium text-zinc-500">
                                Color: {item.color.name || "N/A"}
                              </div>
                              <div className="sm:text-sm text-xs font-medium text-zinc-500">
                                Size: {item.size.sizeNumber || "N/A"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center border rounded-md w-fit">
                            <button
                              onClick={() =>
                                decreaseQuantity(
                                  item.productId,
                                  item.selectedColorId,
                                  item.selectedSizeId
                                )
                              }
                              className={`px-3 py-1 border-r cursor-pointer hover:bg-gray-100 ${
                                item.quantity <= 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button
                              onClick={() =>
                                increaseQuantity(
                                  item.productId,
                                  item.selectedColorId,
                                  item.selectedSizeId
                                )
                              }
                              className={`px-3 py-1 border-l cursor-pointer hover:bg-gray-100 ${
                                item.quantity >= item.product.stock.quantity
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={
                                item.quantity >= item.product.stock.quantity
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2 col-span-full flex sm:flex-col sm:mt-0 mt-4 items-end justify-between">
                      <h3 className="font-bold text-xl text-green-600">
                        $
                        {(item.product.price * item.quantity).toFixed(2)}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Link href={`/product/${item.product.slug}`}>
                          <button className="bg-blue-400 hover:bg-blue-500 sm:px-4 px-2 py-1 rounded-md border flex items-center gap-1 font-medium text-xs text-white">
                            <Eye className="h-5 w-5" />
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-rose-600 hover:bg-rose-700 sm:px-4 px-2 py-1 rounded-md border flex items-center gap-1 font-medium text-sm text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="w-full">
            <div className="flex flex-col justify-center items-center space-y-3">
              <Image
                src="/empty-cart.png"
                alt="Empty Cart"
                width={400}
                height={400}
              />
              <div className="flex flex-col items-center space-y-4">
                <h2 className="font-bold md:text-2xl text-xl">
                  Ohh.. Your Cart is Empty
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
      </section>
    </main>
  );
};

export default CartProfilePage;
