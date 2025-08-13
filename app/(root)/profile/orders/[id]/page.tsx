"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Order } from "@/types/order";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";
import { useMyContext } from "@/app/(root)/context/store";

const OrderEditPage = () => {
  const { store } = useMyContext();
  const params = useParams();
  const [order, setOrder] = useState<Order>();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSingleOrder = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/order/fetch-order-by-id/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store?.auth?.token}`,
            },
          }
        );
        const data = await res.json();
        setOrder(data.order);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch coupon");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load Order");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleOrder();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="space-y-8">
        {/* Shipping Address */}
        <div>
          <h2 className="md:text-lg font-semibold text-center">
            Shipping Address
          </h2>
          <div className=" text-sm leading-6 grid md:grid-cols-3 gap-6 my-8">
            <div className="space-y-2">
              <Label className="text-lighttext text-xs">Full Name</Label>
              <Input
                value={order?.shippingAddress.fullName}
                className="bg-white pointer-events-none shadow-none border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lighttext text-xs">Contact Number</Label>
              <Input
                value={order?.shippingAddress.phone}
                className="bg-white pointer-events-none shadow-none border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lighttext text-xs">Street</Label>
              <Input
                value={order?.shippingAddress.street}
                className="bg-white pointer-events-none shadow-none border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lighttext text-xs">City</Label>
              <Input
                value={order?.shippingAddress.city}
                className="bg-white pointer-events-none shadow-none border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lighttext text-xs">State</Label>
              <Input
                value={order?.shippingAddress.state}
                className="bg-white pointer-events-none shadow-none border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lighttext text-xs">Zip Code</Label>
              <Input
                value={order?.shippingAddress.zipCode}
                className="bg-white pointer-events-none shadow-none border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lighttext text-xs">Country</Label>
              <Input
                value={order?.shippingAddress.country}
                className="bg-white pointer-events-none shadow-none border"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="md:text-lg font-semibold mb-4 text-center">
            Shipping Method
          </h2>
          <Input
            value={order?.shippingMethod}
            className="bg-white pointer-events-none shadow-none border"
          />
        </div>

        <div>
          <h2 className="md:text-lg font-semibold mb-4 text-center">Note</h2>

          <textarea
            className="w-full pointer-events-none bg-white rounded-md p-2 border shadow-none"
            name="description"
            value={order?.notes}
            rows={8}
            required
          ></textarea>
        </div>

        <div>
          <h2 className="md:text-lg font-semibold text-center">
            Ordered Products
          </h2>
          <div className="space-y-4 my-8 grid lg:grid-cols-2 gap-4">
            {(order?.items?.length ?? 0) > 0 ? (
              order!.items!.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start gap-6 rounded-xl border border-gray-200 bg-white p-5 mb-6 transition"
                >
                  <Image
                    src={
                      item.product.featureImage ||
                      item.product.media[0]?.mediaUrl
                    }
                    alt={item.product.name}
                    width={1000}
                    height={1000}
                    className="rounded-xl h-[10em] sm:w-[10em] w-full border object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-gray-800 mb-1 line-clamp-3">
                      {item.product.name}
                    </h3>

                    <section className="space-y-2 my-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Sizes:
                        </span>

                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs border border-blue-100">
                          {item.size.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Colors:
                        </span>

                        <span
                          className="w-5 h-5 rounded-full border shadow-sm"
                          style={{
                            backgroundColor: item.color.hex,
                          }}
                        ></span>
                      </div>

                      {/* Pricing & Quantity */}
                      <div className=" space-y-1 text-sm text-gray-700">
                        <p className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">
                            Quantity:
                          </span>
                          <span>{item.quantity}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">
                            Price:
                          </span>
                          <span className="text-green-600 font-semibold">
                            $ {item.price}
                          </span>
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                The Product has been Permanently deleted by the Admin.
              </p>
            )}
          </div>

          <h2 className="text-lg font-bold">
            Delivery :<span className="text-yellow-600 text-lg"> Rs. 50</span>
          </h2>
          <h2 className="text-xl font-bold">
            Total :
            <span className="text-green-500 text-2xl">
              {" "}
              Rs. {order?.totalAmount}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OrderEditPage;
