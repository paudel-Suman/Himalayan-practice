"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TestimonialType } from "@/types/testimonial";
import PageHeader from "@/components/text/page-header";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";

const TestimonialPage = () => {
  const token = Cookies.get("token");
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/testimonial/delete-testimonial/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setTestimonials((prev) => prev.filter((item) => item.id !== id));
        toast.success("Testimonial Deleted Successfully");
      } else {
        toast.error("Failed to Delete Testimonial");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/testimonial/fetch-all-testimonial`
        );

        const data = await res.json();
        setTestimonials(data.testimonials);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching product reviews:", error);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
        <PageHeader
          title="Testimonials"
          className="text-start w-fit !text-md "
        />

        <Link href="/dashboard/testimonial/add">
          <Button>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add Testimonial
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.message.slice(0,40) + "...."}</TableCell>
              <TableCell>
                <Image
                  src={
                    item.avatar ||
                    "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-14 w-14 object-cover"
                />
              </TableCell>
              <TableCell>{item.designation}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/testimonial/edit/${item.id}`}>
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

export default TestimonialPage;
