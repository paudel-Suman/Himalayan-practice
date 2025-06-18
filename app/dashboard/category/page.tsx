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
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-20"
                />
              </TableCell>
              <TableCell>{item.isActive ? "Yes" : "No"}</TableCell>
              {/* <TableCell>
                {moment(item.createdAt).format("MMMM Do YYYY")}
              </TableCell> */}
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryPage;
