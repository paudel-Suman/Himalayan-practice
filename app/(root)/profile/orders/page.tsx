"use client";

import { useEffect, useState } from "react";
import { useMyContext } from "../../context/store";
import toast from "react-hot-toast";
import { Order } from "@/types/order";
import SpinLoader from "@/app/spin-loader";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const OrderPage = () => {
  const { store } = useMyContext();
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/fetch-user-order`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch reviews");
      }

      setOrder(data.order);
      console.log(data.order);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "PROCESSING":
        return <Badge className="bg-blue-500 text-white">Processing</Badge>;
      case "SHIPPED":
        return <Badge className="bg-indigo-500 text-white">Shipped</Badge>;
      case "DELIVERED":
        return <Badge className="bg-green-600 text-white">Delivered</Badge>;
      case "CANCELLED":
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
      case "REFUNDED":
        return <Badge className="bg-purple-600 text-white">Refunded</Badge>;
      case "CASH ON DELIVERY":
        return (
          <Badge className="bg-blue-700 text-white">Cash on Delivery</Badge>
        );
      case "ONLINE PAYMENT":
        return (
          <Badge className="bg-orange-500 text-white">Online Payment</Badge>
        );
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  if (loading) return <SpinLoader />;

  return (
    <main>
      {order.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold">Ordered Products</h2>
          <div className="grid lg:grid-cols-2 gap-8 my-8">
            {order.map((prod, index) => (
              <div
                key={index}
                className="space-y-4  rounded-xl shadow-sm  hover:shadow-md transition border border-gray-200 bg-white p-5 gap-4"
              >
                {prod?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="grid sm:grid-cols-2 items-center gap-6  "
                  >
                    <Image
                      src={
                        item.product.featureImage ||
                        item.product.media[0]?.mediaUrl
                      }
                      alt={item.product.name}
                      width={140}
                      height={140}
                      className="rounded-xl border object-cover w-full"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
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
                ))}

                <div className="grid sm:grid-cols-3 sm:space-y-0 space-y-4 items-center">
                  <p className="text-sm font-medium">
                    OrderId :{" "}
                    <Badge className="bg-blue-500 uppercase">
                      {prod.id.slice(-4)}
                    </Badge>
                  </p>

                  <p className="text-sm font-medium">
                    Status : <StatusBadge status={prod.status} />
                  </p>

                  <Link href={`/profile/orders/${prod.id}`}>
                    <Button className="w-full bg-primarymain">
                      View All Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Orders Yet</p>
        </div>
      )}
    </main>
  );
};

export default OrderPage;
