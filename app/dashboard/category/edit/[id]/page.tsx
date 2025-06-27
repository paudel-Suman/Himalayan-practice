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
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Loader } from "lucide-react";

const CategoryEditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const token = Cookies.get("token");
  const router = useRouter();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [categoryImage, setCategoryImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    subcategories: [] as string[],
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
  useEffect(() => {
    const fetchSingleCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/category/fetch-category-by-id/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch coupon");
        }

        const categoryData = data.category;

        setFormData({
          name: categoryData.name || "",
          slug: categoryData.slug || "",
          image:
            (categoryData.image && setCategoryImage(categoryData.image)) || "",
          subcategories: categoryData.subcategories || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load coupon");
      }
    };

    fetchSingleCategory();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/category/update-product-category`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: id,
            name: formData.name,
            slug: formData.slug,
            image: image || categoryImage,
            subcategories: formData.subcategories,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Category Updated Successfully");
      router.push("/dashboard/category");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <BreadcrumbPage className="text-green-500">Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Edit Category</h2>

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
          />
        </div>
        <figure>
          {categoryImage && (
            <Image
              src={categoryImage}
              alt="category-image"
              width={500}
              height={500}
              className="h-[20em] w-full object-contain"
            />
          )}
        </figure>
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
    </main>
  );
};

export default CategoryEditPage;
