"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Order } from "@/types/order";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";
const OrderEditPage = () => {
  const token = Cookies.get("token");
  const params = useParams();
  const [order, setOrder] = useState<Order>();
  const id = params.id as string;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    status: "",
    isPaid: false,
    isCancelled: false,
  });

  useEffect(() => {
    const fetchSingleOrder = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/order/fetch-order-by-id/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setOrder(data.order);

        const orderData = data.order;

        setFormData({
          status: orderData.status || "",
          isPaid: orderData.isPaid ?? false,
          isCancelled: orderData.isCancelled ?? false,
        });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/update-order/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: formData.status,
            isPaid: formData.isPaid,
            isCancelled: formData.isCancelled,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Order Updated Successfully");
      router.push("/dashboard/orders");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/orders">Orders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-8 mt-10">
        {/* Shipping Address */}
        <div>
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <div className=" text-sm leading-6 grid md:grid-cols-3 gap-6 my-8">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={order?.shippingAddress.fullName} disabled />
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input value={order?.shippingAddress.phone} disabled />
            </div>
            <div className="space-y-2">
              <Label>Street</Label>
              <Input value={order?.shippingAddress.street} disabled />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={order?.shippingAddress.city} disabled />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={order?.shippingAddress.state} disabled />
            </div>
            <div className="space-y-2">
              <Label>Zip Code</Label>
              <Input value={order?.shippingAddress.zipCode} disabled />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={order?.shippingAddress.country} disabled />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
          <Input value={order?.shippingMethod} disabled />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Note</h2>

          <textarea
            className="w-full bg-white rounded-md p-2"
            name="description"
            value={order?.notes}
            rows={8}
            required
            disabled
          ></textarea>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Ordered Products</h2>
          <div className="space-y-4 my-8 grid md:grid-cols-2 gap-4">
            {order?.items?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start gap-6 rounded-xl shadow-sm border border-gray-200 bg-white p-5 mb-6 transition hover:shadow-md"
              >
                <Image
                  src={
                    item.product.featureImage || item.product.media[0]?.mediaUrl
                  }
                  alt={item.product.name}
                  width={140}
                  height={140}
                  className="rounded-xl border object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.product.name}
                  </h3>

                  <section className="space-y-2 my-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-800">Sizes:</span>

                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs border border-blue-100">
                        {item.size.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-800">Colors:</span>

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
                        <span className=" font-semibold">$ {item.price}</span>
                      </p>
                      <p className="flex items-center gap-2 text-lg">
                        <span className="font-medium text-gray-800">
                          Subtotal:
                        </span>
                        <span className="text-green-600 font-semibold">
                          $ {item.quantity * Number(item.price)}
                        </span>
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-md font-bold">
            Delivery :<span className="text-yellow-600 text-lg"> $ 50</span>
          </h2>
          <h2 className="text-lg font-bold">
            Total :
            <span className="text-green-600 text-xl">
              {" "}
              $ {order?.totalAmount}
            </span>
          </h2>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-10">Edit Order Status</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Order Status</Label>

            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Deliverd</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Payment Status</Label>

            <Select
              value={String(formData.isPaid)}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, isPaid: value === "true" }))
              }
            >
              {" "}
              <SelectTrigger className="w-full bg-white">
                <SelectValue>
                  {formData.isPaid ? "Fulfilled" : "Not Fulfilled"}
                </SelectValue>{" "}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Fulfilled</SelectItem>
                <SelectItem value="false">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Delivery Status</Label>
            <Select
              value={String(formData.isCancelled)}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  isCancelled: value === "true",
                }))
              }
            >
              {" "}
              <SelectTrigger className="w-full bg-white">
                <SelectValue>
                  {formData.isCancelled ? "Delivered" : "Not Delivered"}
                </SelectValue>{" "}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Deliverd</SelectItem>
                <SelectItem value="false">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        <Button disabled={loading}>
          {loading ? (
            <div className="flex gap-2">
              <Loader className="animate-spin h-4 w-4" />
              Updating
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </div>
  );
};

export default OrderEditPage;
