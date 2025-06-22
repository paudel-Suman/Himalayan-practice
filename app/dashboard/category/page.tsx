"use client";
import { categoryService } from "@/services/superadmin/category-service";
import { categoryType } from "@/types/category";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/app/loading";
import Image from "next/image";
import PageHeader from "@/components/text/page-header";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryPage = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    title: "",
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

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/category/delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setCategories((prev) => prev.filter((item) => item.id !== id));
        toast.success("Product Deleted Successfully");
      } else {
        toast.error("Failed to Delete Product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex justify-between items-start">
        <PageHeader
          title="Category"
          className="text-start w-fit !text-md mb-8"
        />

        <div className="flex gap-4">
          <Button onClick={() => setAddSubCategory(!addSubCategory)}>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add SubCategory
          </Button>

          <Link href="/dashboard/category/add">
            <Button>
              <Icon icon="gridicons:add" width="24" height="24" />
              Add Category
            </Button>
          </Link>
        </div>
      </div>

      {addSubCategory && (
        <div
          onClick={() => setAddSubCategory(false)}
          className="bg-black/40 z-[20] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  fixed inset-0 h-screen w-full"
        />
      )}
      <form
        // onSubmit={handleSubmit}
        className={`${
          addSubCategory ? "block" : "hidden"
        }  absolute z-[20] left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2  w-[20em] bg-white rounded-md p-4 space-y-4`}
      >
        <Label>Add SubCategory</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />

        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>

          <SelectContent className="w-full flex flex-col">
            {categories.map((item, index) => (
              <SelectItem key={index} value={item.id} className="text-black">
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>Submit</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>is Active</TableHead>
            <TableHead>subCategories</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.slug}</TableCell>
              <TableCell>
                <Image
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-14 w-14 object-cover"
                />
              </TableCell>
              <TableCell>
                {item.isActive ? (
                  <Badge className="bg-green-500">Yes</Badge>
                ) : (
                  <Badge className="bg-red-500">No</Badge>
                )}
              </TableCell>

              <TableCell>
                {item.subcategories.map((sub) => sub.name).join(",")}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="lucide:edit"
                    width="20"
                    height="20"
                    className="text-blue-500"
                  />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Icon
                        icon="ant-design:delete-outlined"
                        width="20"
                        height="20"
                        className="text-red-500"
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryPage;
