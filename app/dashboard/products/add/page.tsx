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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import S3UploadForm from "@/lib/s3upload-form";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

const AddProduct = () => {
  const token = Cookies.get("token");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    featureImage: "",
    categoryId: "",
    price: 0,
    stock: "",
    isActive: true,
    isDeleted: false,
    isFeatured: false,
    media: [],
    productAttributes: [],
    tags: [],
  });

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const newSlug = slugify(formData.name);
    setFormData((prev) => ({
      ...prev,
      slug: newSlug,
    }));
  }, [formData.name]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleUploadFeatureImage = (urls: string[]) => {
    setImage(urls[0]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/create-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            categoryId: formData.categoryId,
            price: formData.price,
            featureImage: image,
            isFeatured: formData.isFeatured,
            
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Product Added Successfully");
      // router.push("/dashboard/category");
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
              <Link href="/dashboard/products">Product</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Product</h2>
      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Stylish Fashion Bag"
              className="bg-white shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input name="slug" value={formData.slug} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="500"
            />
          </div>
        </section>

        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => {
                const selected = categories.find((cat) => cat.id === value);
                setFormData((prev) => ({
                  ...prev,
                  categoryId: value,
                  category: selected?.name || "",
                }));
              }}
            >
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-white rounded-md p-2"
            placeholder="Description of the product"
            rows={8}
          ></textarea>
        </div>

        <div className="space-y-2">
          <Label>Feature Image</Label>
          <S3UploadForm
            id={"feature-image"}
            multiple={false}
            onUploadComplete={handleUploadFeatureImage}
          />
        </div>

        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default AddProduct;
