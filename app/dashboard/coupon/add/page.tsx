"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const CouponAddPage = () => {
  const [couponType, setCouponType] = useState<string>("AMOUNT");
  const token = Cookies.get("token");
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    couponCount: 0,
    expiryDate: "",
    type: "",
    discountAmount: 0,
    discountPercent: 0,
  });

  const [errors, setErrors] = useState({
    code: "",
    couponCount: "",
    expiryDate: "",
    type: "",
    discountAmount: "",
    discountPercent: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "couponCount" ||
        name === "discountAmount" ||
        name === "discountPercent"
          ? Number(value)
          : value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      ...errors,
    };

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
      toast.error("Coupon code is required");
      valid = false;
    }

    if (!formData.couponCount || formData.couponCount <= 0) {
      newErrors.couponCount = "Coupon count must be greater than 0";
      toast.error("Coupon count must be greater than 0");
      valid = false;
    }

    const selectedDate = new Date(formData.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
      toast.error("Expiry date is required");
      valid = false;
    } else if (selectedDate < today) {
      newErrors.expiryDate = "Expiry date cannot be in the past";
      toast.error("Expiry date cannot be in the past");
      valid = false;
    }

    if (couponType === "AMOUNT") {
      if (!formData.discountAmount || formData.discountAmount <= 0) {
        newErrors.discountAmount = "Discount amount must be greater than 0";
        toast.error("Discount amount must be greater than 0");
        valid = false;
      }
    } else {
      if (
        !formData.discountPercent ||
        formData.discountPercent <= 0 ||
        formData.discountPercent > 100
      ) {
        newErrors.discountPercent =
          "Discount percentage must be between 1 and 100";
        toast.error("Discount percentage must be between 1 and 100");
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/coupon/create-coupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code: formData.code,
            couponCount: formData.couponCount,
            expiryDate: formData.expiryDate,
            type: couponType,
            discountAmount: formData.discountAmount,
            discountPercent: formData.discountPercent,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Coupon Added Successfully");
      router.push("/dashboard/coupon");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="my-4">
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
              <Link href="/dashboard/coupon">Coupon</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Coupon</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Coupon Code</Label>
            <Input
              name="code"
              type="number"
              value={formData.code}
              onChange={handleChange}
              placeholder="2252525"
              className="bg-white shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Coupon Count</Label>
            <Input
              name="couponCount"
              value={formData.couponCount}
              onChange={handleChange}
              type="number"
              placeholder="10"
            />
          </div>
          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Input
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              type="date"
              placeholder="500"
            />
          </div>
        </section>

        <div className="space-y-2">
          <Label>Type of Coupon</Label>
          <Select
            onValueChange={(value) => {
              setCouponType(value);
              setFormData((prev) => ({ ...prev, type: value }));
            }}
            defaultValue={couponType}
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Coupon Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AMOUNT">AMOUNT</SelectItem>
              <SelectItem value="PERCENTAGE">PERCENTAGE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{couponType === "AMOUNT" ? "Amount" : "Percentage"}</Label>
          <Input
            name={
              couponType === "AMOUNT" ? "discountAmount" : "discountPercent"
            }
            value={
              couponType === "AMOUNT"
                ? formData.discountAmount
                : formData.discountPercent
            }
            onChange={handleChange}
            type="number"
            placeholder={couponType === "AMOUNT" ? "e.g. 500" : "e.g. 10%"}
          />
        </div>

        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default CouponAddPage;
