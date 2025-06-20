"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryType } from "@/types/category";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const AddProduct = () => {
  const [categories, setCategories] = React.useState<categoryType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/category/fetch-all-categories`
        );

        const data = await res.json();
        setCategories(data.categories);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching product reviews:", error);
        toast.error("Failed to load reviews");
      }
    };
    fetchCategory();
  }, []);
  return (
    <main className="my-4">
      <h2 className="text-xl font-bold">Add Product</h2>
      <form className="my-8 space-y-6">
        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              placeholder="Stylish Fashion Bag"
              className="bg-white shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input placeholder="Stylish Fashion Bag" />
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <Input placeholder="500" />
          </div>
        </section>

        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent className="w-full flex flex-col">
                {categories.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.id}
                    className="text-black"
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Stock Quantity</Label>
            <Input placeholder="20" />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <Input placeholder="fashion,bags,stylish" />
          </div>
        </section>

        <div>
          <Label>Description</Label>
        </div>
      </form>
    </main>
  );
};

export default AddProduct;
