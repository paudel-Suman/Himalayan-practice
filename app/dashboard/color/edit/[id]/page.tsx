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
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { ChromePicker } from "react-color";

const ColorEditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const token = Cookies.get("token");
  const router = useRouter();
  const [color, setColor] = useState("#ff0000");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchSingleColor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/product-color/fetch-product-color-by-id/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch Color");
        }

        const colorData = data.color;

        setFormData({
          name: colorData.name || "",
          hex: colorData.hex || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load Size");
      }
    };
    fetchSingleColor();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product-color/update-product-color/${id}`,
        {
          method: "PATCH",
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
            <BreadcrumbPage className="text-green-500">Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="text-xl font-bold mt-10">Edit Color</h2>

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
              Updating
            </div>
          ) : (
            "Update"
          )}
        </Button>{" "}
      </form>
    </div>
  );
};

export default ColorEditPage;
