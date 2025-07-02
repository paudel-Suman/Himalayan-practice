"use client";
import PageHeader from "@/components/text/page-header";
import { Input } from "@/components/ui/input";
import { orderService } from "@/services/superadmin/order-service";
import { Order } from "@/types/order";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@/components/ui/badge";
import Loading from "@/app/loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Link from "next/link";

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const token = Cookies.get("token");

  console.log(filteredOrders);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = orderService.fetchAllOrders();
        setOrders((await orders).data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    searchOrders();
  }, [searchQuery]);

  const searchOrders = async () => {
    if (searchQuery === " ") {
      setFilteredOrders(orders);
    } else {
      const response = await orderService.searchOrder(searchQuery);
      const orders = response?.orders || [];
      setOrders(orders);
      setOrders((await response).orders);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/delete-order/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setOrders((prev) => prev.filter((item) => item.id !== id));
        toast.success("Order Deleted Successfully");
      } else {
        toast.error("Failed to Delete Order");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  
  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between mb-6">
        <PageHeader title="Orders" className="text-start w-fit !text-md " />
        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Is Paid</TableHead>
              <TableHead>Is Cancelled</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item) => (
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

                <TableCell>$.{item.totalAmount}</TableCell>
                <TableCell>
                  {item.isPaid ? (
                    <Badge className="bg-green-500">Yes</Badge>
                  ) : (
                    <Badge className="bg-red-500">No</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {item.isCancelled ? (
                    <Badge className="bg-green-500">Yes</Badge>
                  ) : (
                    <Badge className="bg-red-500">No</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {moment(item.createdAt).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/orders/edit/${item.id}`}>
                      <Icon
                        icon="lucide:edit"
                        width="20"
                        height="20"
                        className="text-blue-500"
                      />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Icon
                          icon="ant-design:delete-outlined"
                          width="20"
                          height="20"
                          className="text-red-500"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="font-semibold text-2xl text-red-500">
            No Orders received Yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
