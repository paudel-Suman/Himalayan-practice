"use client";

import { useEffect, useState } from "react";
import { useMyContext } from "../../context/store";
import { Order } from "@/types/order";
import SpinLoader from "@/app/spin-loader";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import moment from "moment";

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
        throw new Error(data.message || "Failed to fetch Orders");
      }

      setOrder(data.order || []);
      console.log(data.order);
    } catch (error) {
      console.error("Error fetching Orders:", error);
    } finally {
      setLoading(false);
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
          <h2 className="text-xl font-semibold text-center mb-6 mt-4">
            Ordered Products
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Is Cancelled</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id.slice(-5).toUpperCase()}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    {item.shippingMethod === "CASH ON DELIVERY" ? (
                      <Badge className="bg-blue-500">Cash on Delivery</Badge>
                    ) : (
                      <Badge className="bg-orange-500">Online Payment</Badge>
                    )}
                  </TableCell>

                  <TableCell>Rs.{item.totalAmount}</TableCell>

                  <TableCell>
                    {item.isCancelled ? (
                      <Badge className="bg-green-500">Yes</Badge>
                    ) : (
                      <Badge className="bg-red-500">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {moment(item.placedAt).format("MMMM Do YYYY")}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    {" "}
                    <Link href={`/profile/orders/${item.id}`}>
                      <Button className="w-fit mx-auto py-5 ">View  Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="font-semibold text-xl">No Orders Created Yet !</p>
        </div>
      )}
    </main>
  );
};

export default OrderPage;
