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

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  console.log(filteredOrders)
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

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between">
        <PageHeader title="Orders" className="text-start w-fit !text-md mb-8" />
        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Status</TableHead>
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
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Badge className="bg-yellow-500">{item.status}</Badge>
              </TableCell>
              <TableCell>Rs .{item.totalAmount}</TableCell>
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
                  <Icon
                    icon="lucide:edit"
                    width="20"
                    height="20"
                    className="text-blue-500"
                  />
                  <Icon
                    icon="ant-design:delete-outlined"
                    width="20"
                    height="20"
                    className="text-red-500"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderPage;
