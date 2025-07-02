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
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryType } from "@/types/category";
import { categoryService } from "@/services/superadmin/category-service";
import Loading from "@/app/loading";
import { Loader } from "lucide-react";

const SubCategoryAddPage = () => {
  const token = Cookies.get("token");
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
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

  const fetchAllCategories = async () => {
    try {
      const response = await categoryService.fetchAllCategories();
      const res = response?.categories ?? [];
      setCategories(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/subcategory/create-subcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            categoryId: formData.categoryId,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("SubCategory Added Successfully");
      router.push("/dashboard/sub-category");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;

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
              <Link href="/dashboard/sub-category">Category</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Sub Category</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid  gap-8">
          <div className="space-y-2">
            <Label>Subcategory Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Category Name</Label>

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
    </main>
  );
};

export default SubCategoryAddPage;
