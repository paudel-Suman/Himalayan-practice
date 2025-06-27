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
import { Badge } from "@/components/ui/badge";

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
            <TableCell className="font-medium">
              {item.id.slice(-5).toUpperCase()}
            </TableCell>
            <TableCell>
              {item.items.map((prod) => (
                <div key={prod.id}>{prod.product?.name}</div>
              ))}
            </TableCell>
            <TableCell>{item.shippingMethod}</TableCell>
            <TableCell>{item.shippingAddress.street}</TableCell>
            <TableCell>{item.totalAmount}</TableCell>
            <TableCell className="text-right">
              <StatusBadge status={item.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderPage;
