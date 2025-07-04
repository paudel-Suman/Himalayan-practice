"use client";
import BarChartDemo from "@/components/charts/barchart";
import PieChartDemo from "@/components/charts/piechart";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import { orderService } from "@/services/superadmin/order-service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Loading from "../loading";
import PageHeader from "@/components/text/page-header";
import { getDashboardStats } from "@/services/superadmin/fetch-count";
import { DashboardStats } from "@/types/dashboardstats";
import Link from "next/link";

const OverviewPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        console.log("stats", res);
        setStats(res);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.fetchAllOrders();
        setOrders(res.orders.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  if (!stats) {
    return <Loading />;
  }

  const overviewdata = [
    {
      title: "Total Sales",
      num: `$ ${stats.totalSales}`,
      icon: "/icons/growth.png",
    },
    {
      title: "Customers",
      num: stats.customersCount,
      icon: "/icons/client.png",
    },
    {
      title: "Orders",
      num: stats.ordersCount,
      icon: "/icons/check-mark.png",
    },
    {
      title: "Products",
      num: stats.productsCount,
      icon: "/icons/brand.png",
    },
  ];

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
    <main>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-6">
        {overviewdata.map((item, index) => (
          <div key={index} className="bg-white shadow-sm  p-4 rounded-md">
            <div className="flex justify-between">
              <h2 className="text-base font-semibold text-lighttext">
                {item.title}
              </h2>
              <Image src={item.icon} alt={item.title} width={40} height={40} />
            </div>

            <h2 className="text-xl font-bold mt-6">{item.num}</h2>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 my-8">
        <BarChartDemo />
        <PieChartDemo />
      </div>

      <PageHeader
        title="Recent Orders"
        className="text-start w-fit !text-md mb-8"
      />
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
        <div className="flex justify-center items-center h-[20vh]">
          <h2 className="font-semibold text-2xl ">No Orders received Yet</h2>
        </div>
      )}
    </main>
  );
};

export default OverviewPage;
