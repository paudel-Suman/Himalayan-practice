"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChromePicker } from "react-color";

const ColorAddPage = () => {
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();
  const [color, setColor] = useState("#ff0000");

  const [formData, setFormData] = useState({
    name: "",
    hex: color,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product-color/create-product-color`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            hex: formData.hex,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Color Added Successfully");
      router.push("/dashboard/color");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
              <Link href="/dashboard/color">Color</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="text-xl font-bold mt-10">Add Color</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid gap-6">
          <div className="space-y-2">
            <Label>Color Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Red"
              className="bg-white shadow-none"
              required
            />
          </div>

          <div>
            <ChromePicker
              color={color}
              onChangeComplete={(newColor) => {
                setColor(newColor.hex);
                setFormData((prev) => ({ ...prev, hex: newColor.hex }));
              }}
            />
          </div>
        </section>
        <Button disabled={loading}>
          {loading ? (
            <div className="flex gap-2">
              <Loader className="animate-spin h-4 w-4" />
              Submitting
            </div>
          ) : (
            "Submit"
          )}
        </Button>{" "}
      </form>
    </div>
  );
};

export default ColorAddPage;
