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
import S3UploadForm from "@/lib/s3upload-form";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCategory } from "@/types/blogs";
import { useRouter } from "next/navigation";



const BlogAddPage = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    category: "",
    categoryId: "",
  });

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const newSlug = slugify(formData.title);
    setFormData((prev) => ({
      ...prev,
      slug: newSlug,
    }));
  }, [formData.title]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadBlogImage = (urls: string[]) => {
    setImage(urls[0]);
  };

  const [categories, setCategories] = React.useState<BlogCategory[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/blog-category/fetch-all-categories`
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
        `${process.env.NEXT_PUBLIC_SERVER_API}/blog/create-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            slug: formData.slug,
            category: formData.category,
            categoryId: formData.categoryId,
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
      router.push("/dashboard/blogs");
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
              <Link href="/dashboard/blogs">Blogs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Blogs</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Blog Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="How to Increase Sales"
              className="bg-white shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input name="slug" value={formData.slug} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => {
                const selected = categories.find((cat) => cat.id === value);
                setFormData((prev) => ({
                  ...prev,
                  categoryId: value,
                  category: selected?.title || "",
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
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 hidden">
            <Label>categoryId</Label>
            <Input
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            />
          </div>
        </section>

        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            className="w-full bg-white rounded-md p-2"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description of the title"
            rows={8}
          ></textarea>
        </div>

        <div className="space-y-2">
          <Label>Display Image</Label>
          <S3UploadForm
            id={"blog-image"}
            multiple={false}
            onUploadComplete={handleUploadBlogImage}
          />
        </div>

        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default BlogAddPage;
