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
import S3UploadForm from "@/lib/s3upload-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const CategoryAddPage = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    subcategoris: [],
    // isActive: true,
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

  const handleUploadCategoryImage = (urls: string[]) => {
    setImage(urls[0]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/category/create-product-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            slug: formData.slug,
            image: image,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Blog Added Successfully");
      router.push("/dashboard/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="my-6">
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
              <Link href="/dashboard/category">Category</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Category</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="How to Increase Sales"
              className="bg-white shadow-none"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input name="slug" value={formData.slug} readOnly />
          </div>
        </section>

        <div className="space-y-2">
          <Label>Image</Label>
          <S3UploadForm
            id={"category-image"}
            multiple={false}
            onUploadComplete={handleUploadCategoryImage}
            isrequired={true}
          />
        </div>

        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default CategoryAddPage;
