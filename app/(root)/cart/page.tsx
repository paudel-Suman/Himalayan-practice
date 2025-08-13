"use client";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/store";
import { Cart } from "@/types/cart";
import toast from "react-hot-toast";
import SpinLoader from "@/app/spin-loader";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const { store, setStore } = useMyContext();
  const [cart, setCart] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCoupounDiscount] = useState(0);
  const [discounrRate, setDiscountRate] = useState(0);


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
    localStorage.setItem("himalayan-cart", JSON.stringify(updatedCart));
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
    localStorage.setItem("himalayan-cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        if (!store?.auth?.token) {
          setCart([]);
          return;
        }
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
        const updatedCart = data?.cart?.items || [];

        setStore((prev: any) => ({
          ...prev,
          cart: updatedCart,
        }));

        localStorage.setItem("himalayan-cart", JSON.stringify(updatedCart));
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
  }, [store?.auth?.token]); 


  const handleDelete = async (cartId: string) => {
    const previousCart = [...cart];
    const updatedCart = cart.filter((item) => item.id !== cartId);

    setCart(updatedCart);
    setStore((prev: any) => ({
      ...prev,
      cart: updatedCart,
    }));
    localStorage.setItem("himalayan-cart", JSON.stringify(updatedCart));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/cart/delete-cart-item/${cartId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
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
      setStore((prev: any) => ({
        ...prev,
        cart: previousCart,
      }));
      localStorage.setItem("himalayan-cart", JSON.stringify(previousCart));

      toast.error("Failed to delete item from cart");
    }
  };

  const handleCouponCheck = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/coupon/validate-coupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
          body: JSON.stringify({ code: couponCode }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }

      const coupon = data.coupon;
      if (coupon.couponCount <= 0) {
        toast.error("Coupon usage limit has been reached");
        return;
      }
      const now = new Date();
      const expiryDate = new Date(coupon.expiryDate);
      if (expiryDate < now) {
        toast.error("Coupon has expired");
        return;
      }

      let calculatedDiscount = 0;

      if (coupon.discountAmount) {
        calculatedDiscount = coupon.discountAmount;
      } else if (coupon.discountPercent) {
        calculatedDiscount = (Number(subtotal) * coupon.discountPercent) / 100;
        setDiscountRate(coupon.discountPercent);
        console.log("diss", calculatedDiscount);
      } else {
        toast.error("Coupon does not contain any discount information");
        return;
      }

      // Check if discount is greater than subtotal
      if (calculatedDiscount > Number(subtotal)) {
        toast.error("Coupon discount cannot exceed subtotal.");
        return;
      }

      setCoupounDiscount(calculatedDiscount);
      toast.success("Coupon Applied Successfully");
    } catch (error) {
      console.error("Coupon validation failed", error);
      toast.error("Something went wrong");
    } finally {
    }
  };

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const discount = couponDiscount;
    const deliveryFee = 50.0;

    const total = subtotal - discount + deliveryFee;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2),
    };
  };

  if (loading) return <SpinLoader />;
  const { subtotal, discount, deliveryFee, total } = calculateTotals();

  return (
    <main className="max-w-6xl mx-auto my-8 ">
      <section>
        {cart.length > 0 ? (
          <section>
            <h2 className="text-center font-semibold text-xl">My Cart</h2>
            <div className="p-4 grid lg:grid-cols-8 gap-6 my-8">
              <div className="space-y-4 lg:col-span-5 col-span-full ">
                {cart.map((item: Cart) => (
                  <div
                    key={`${item.id}`}
                    className="grid sm:grid-cols-5 border p-4 rounded-md  py-4"
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
                      <h3 className="font-bold text-xl text-green-500">
                        ${(item.product.price * item.quantity).toFixed(2)}
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
                          className="bg-red-600 hover:bg-red-700 sm:px-4 px-2 py-1 rounded-md border flex items-center gap-1 font-medium text-sm text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-3 col-span-full h-fit p-6 bg-zinc-50  rounded-md">
                <h2 className="font-bold text-xl text-center">Order Summary</h2>

                <form
                  onSubmit={handleCouponCheck}
                  className="flex items-center gap-2 mt-4"
                >
                  <input
                    type="text"
                    className="border border-black/50 border-dashed focus:border-blue-500 focus:outline-none rounded-md my-4 p-3 w-3/4"
                    placeholder="AS78EFE89"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button className="rounded-md  py-6">Apply Coupon</Button>
                </form>

                <div className="mt-6 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-md text-zinc-500">
                      Subtotal
                    </span>
                    <span className="text-lg font-bold">$ {subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-md text-zinc-500">
                      Discount {discounrRate}%
                    </span>
                    <span className="text-lg font-bold">$ {discount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-md text-zinc-500">
                      Delivery Fee
                    </span>
                    <span className="text-lg font-bold">$ {deliveryFee}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-y py-4 my-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-xl font-bold text-green-500">
                    $ {total}
                  </span>
                </div>

                <Link
                  href={{
                    pathname: `/checkout`,
                    query: {
                      discount: couponDiscount,
                    },
                  }}
                >
                  <Button className="mt-8 w-full py-6 text-md bg-green-500 rounded-md hover:bg-primary">
                    Proceed{" "}
                  </Button>
                </Link>
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

export default CartPage;
