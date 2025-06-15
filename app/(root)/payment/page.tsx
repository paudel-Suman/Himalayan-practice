"use client";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/store";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Cart } from "@/types/cart";
import { Info, Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { shippingAddress } from "@/types/shippingaddress";

const PaymentPage = () => {
  const { store } = useMyContext();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState<shippingAddress>();
  const searchParams = useSearchParams();
  const discountAmt = searchParams.get("discount");
  const billingaddress = searchParams.get("billingaddress");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
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
          throw new Error(data.message || "Failed to fetch cart");
        }

        setCart(data.cart.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      }
    };
    fetchUserCart();
  }, []);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/shipping-address/fetch-shipping-address-by-id/${billingaddress}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store?.auth?.token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch cart");
        }

        setSelectedBilling(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load Address");
      }
    };
    fetchUserAddress();
  }, []);

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (sum, item: Cart) => sum + item.product.price * item.quantity,
      0
    );
    const discount = discountAmt;
    const deliveryFee = 50.0; // Fixed delivery fee
    const total = subtotal - (Number(discount) || 0) + deliveryFee;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount,
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const onPlaceOrder = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const items = cart.map((item: Cart) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const payload = {
      shippingAddress: billingaddress,
      billingAddress: billingaddress,
      shippingMethod: paymentMethod.toUpperCase(), // Must match enum in backend if any
      totalAmount: parseFloat(total),
      deliveryDate: "2025-01-01 12:00:00", // Replace with actual or user-chosen date
      notes,
      items,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      toast.success("Order placed successfully!");
      router.push(`/profile/orders`);
    } catch (error) {
      console.error("Order error:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    console.log("payload", payload);
  };

  const { subtotal, discount, deliveryFee, total } = calculateTotals();
  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <section className="grid lg:grid-cols-8 gap-6">
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-lg shadow-sm border">
          {loading ? (
            <p className="  h-[10em] flex justify-center items-center">
              <Loader className="animate-spin" />
            </p>
          ) : (
            selectedBilling && (
              <div
                className={`p-4 border border-dashed space-y-2 shadow-sm cursor-pointer w-[50%] bg-rose-100/50`}
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{selectedBilling.fullName}</p>
                  <p className="bg-rose-500 text-white rounded-full px-4 py-1 text-xs">
                    {selectedBilling.phone}
                  </p>
                </div>
                <p className="text-zinc-500 text-sm">
                  {selectedBilling.street}, {selectedBilling.city},{" "}
                  {selectedBilling.state}
                </p>
              </div>
            )
          )}

          <h3 className="text-lg font-bold mb-4">2. Payment Method</h3>
          <div className="grid sm:grid-cols-1">
            <div className="flex items-center gap-4">
              <div
                className={`p-6 flex flex-col items-center justify-center gap-y-4 rounded-md border w-fit cursor-pointer ${
                  paymentMethod === "Online Payment"
                    ? "bg-green-400 text-white"
                    : ""
                }`}
                onClick={() => setPaymentMethod("Online Payment")}
              >
                <Image
                  src="/paypal.png"
                  alt="paypal"
                  width={100}
                  height={100}
                  className="h-[5vh] object-contain"
                />
                <span className="text-xs font-medium">Online Payment</span>
              </div>
              <div
                className={`p-6 flex flex-col items-center justify-center gap-y-4 rounded-md border w-fit cursor-pointer ${
                  paymentMethod === "Cash on Delivery"
                    ? "bg-green-400 text-white"
                    : ""
                }`}
                onClick={() => setPaymentMethod("Cash on Delivery")}
              >
                <Image
                  src="/delivery-truck.png"
                  alt="paypal"
                  width={100}
                  height={100}
                  className="h-[5vh] object-contain"
                />
                <span className="text-xs font-medium">Cash on Delivery</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Note (Optional) </h3>
            <textarea
              rows={8}
              className="border p-2 rounded-md w-full"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />{" "}
          </div>
          <Button
            onClick={onPlaceOrder}
            className="rounded-full px-8 py-4 justify-end"
          >
            Place Order
          </Button>
        </div>

        {/* Order Summary */}
        <section className="lg:col-span-3 h-fit p-6 bg-zinc-50 border rounded-lg shadow-sm">
          <h2 className="font-bold text-xl text-rose-700">Order Summary</h2>
          <div className="space-y-4 my-2">
            {cart.map((item: Cart) => (
              <div
                key={`${item.productId}-${item.selectedColorId}-${item.selectedSizeId}`}
                className="flex gap-4 shadow-sm bg-white rounded-md p-2"
              >
                <Image
                  src={item.product.featureImage || "/placeholder.png"}
                  alt={item.product.name || "Product Image"}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover rounded-md"
                />
                <div className="flex-1 space-y-1 flex justify-between flex-col">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-4">
                      {" "}
                      <div className="text-sm text-zinc-800 font-medium">
                        Color: {item.color.name || "N/A"}
                      </div>
                      <div className="text-sm text-zinc-800 font-medium">
                        Size: {item.size.sizeNumber || "N/A"}
                      </div>
                      <div className="text-sm text-zinc-800 font-medium">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="font-semibold text-rose-600">
                    {item.product.availableRegions[0].currency}{" "}
                    {(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-zinc-500">Subtotal</span>
              <span className="font-bold"> Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-zinc-500">Discount</span>
              <span className="font-bold">Rs. {discount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-zinc-500">Delivery Fee</span>
              <span className="font-bold"> Rs. {deliveryFee}</span>
            </div>
            <div className="flex justify-between items-center border-y py-4 my-4">
              <span className="font-bold text-lg">Total</span>
              <span className="text-xl font-bold text-rose-700">
                Rs. {total}
              </span>
            </div>
          </div>

          <div className="text-sm text-zinc-500 mt-6 flex gap-1 font-medium">
            <Info className="h-5 w-5" />
            <span className="text-black">90 Days limited warranty</span> against
            manufacturer defect
          </div>

          <Link href={`/cart`}>
            <Button variant="outline" className="mt-4 w-full py-6 rounded-full">
              Back to Cart
            </Button>
          </Link>
        </section>
      </section>
    </main>
  );
};

export default PaymentPage;
