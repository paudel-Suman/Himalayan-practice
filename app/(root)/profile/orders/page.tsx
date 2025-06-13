"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useMyContext } from "../../context/store";
import toast from "react-hot-toast";
import { Order } from "@/types/order";
import SpinLoader from "@/app/spin-loader";

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <SpinLoader />;

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Delivery Address</TableHead>
          <TableHead className="text-left">Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>
              {item.items.map((prod) => (
                <div key={prod.id}>{prod.product?.name}</div>
              ))}
            </TableCell>
            <TableCell>{item.shippingMethod}</TableCell>
            <TableCell>{item.shippingAddress.street}</TableCell>
            <TableCell>{item.totalAmount}</TableCell>
            <TableCell className="text-right capitalize">
              {item.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderPage;
