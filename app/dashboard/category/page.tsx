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

const CategoryPage = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex justify-between items-start">
        <PageHeader
          title="Category"
          className="text-start w-fit !text-md mb-8"
        />

        <Link href="/dashboard/category/add">
          <Button>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add Category
          </Button>
        </Link>
      </div>

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
                  <Icon
                    icon="ant-design:delete-outlined"
                    width="20"
                    height="20"
                    className="text-red-500"
                  />
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
