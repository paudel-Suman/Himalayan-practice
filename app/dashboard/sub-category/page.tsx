"use client";
import { categoryType, Subcategory } from "@/types/category";
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
import { categoryService } from "@/services/superadmin/category-service";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/subcategory/delete-subcategory/${id}`,
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
        toast.success("Sub Category Deleted Successfully");
      } else {
        toast.error("Failed to Delete Category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await categoryService.fetchAllSubategories();
      const res = response?.subcategories ?? [];
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

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
        <PageHeader
          title="Sub Category"
          className="text-start w-fit !text-md "
        />

        <Link href="/dashboard/sub-category/add">
          <Button>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add Sub Category
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>subCategories</TableHead>
            <TableHead>is Active</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                 
                    <Badge className="bg-blue-200 text-black" >
                      {item.category.name}
                    </Badge>
               
                </div>
              </TableCell>

              <TableCell>
                {item.isActive ? (
                  <Badge className="bg-green-500">Yes</Badge>
                ) : (
                  <Badge className="bg-red-500">No</Badge>
                )}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/sub-category/edit/${item.id}`}>
                    <Icon
                      icon="lucide:edit"
                      width="20"
                      height="20"
                      className="text-blue-500"
                    />
                  </Link>
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
