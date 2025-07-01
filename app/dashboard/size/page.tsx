"use client";
import PageHeader from "@/components/text/page-header";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { ProductSize } from "@/types/product";
import Loading from "@/app/loading";

const SizePage = () => {
  const token = Cookies.get("token");
  const [size, setSize] = useState<ProductSize[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product-size/delete-product-size/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setSize((prev) => prev.filter((item) => item.id !== id));
        toast.success("Size Deleted Successfully");
      } else {
        toast.error("Failed to Delete Size");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSize = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/product-size/fetch-product-size`
        );

        const data = await res.json();
        setSize(data.sizes);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch sizes");
        }
      } catch (error) {
        console.error("Error fetching product sizes:", error);
        toast.error("Failed to load sizes");
      } finally {
        setLoading(false);
      }
    };
    fetchSize();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between mb-6">
        <PageHeader
          title="Product Size"
          className="text-start w-fit !text-md "
        />

        <Link href="/dashboard/size/add">
          <Button>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add Size
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>size Number</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {size.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sizeNumber}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/size/edit/${item.id}`}>
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
                          delete your account and remove your data from our
                          servers.
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

export default SizePage;
