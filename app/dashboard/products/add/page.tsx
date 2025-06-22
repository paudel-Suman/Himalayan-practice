"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryType } from "@/types/category";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProduct = () => {
  const [tags, setTags] = useState<string[]>([]);

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

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
            <div className="flex flex-wrap gap-2 ">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <Input
                type="text"
                onKeyDown={handleTagInput}
                placeholder="Add a tag"
              />
            </div>
          </div>
        </section>

        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            className="w-full bg-white rounded-md p-2"
            name="description"
            placeholder="Description of the product"
            rows={8}
          ></textarea>
        </div>
      </form>
    </main>
  );
};

export default AddProduct;
