"use client";
import PageHeader from "@/components/text/page-header";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import { faqType } from "@/types/faq";

const FaqPage = () => {
  const token = Cookies.get("token");
  const [faq, setFaq] = useState<faqType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/faq/delete-faq/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setFaq((prev) => prev.filter((item) => item.id !== id));
        toast.success("faq Deleted Successfully");
      } else {
        toast.error("Failed to Delete faq");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/faq/fetch-all-faq`
        );

        const data = await res.json();
        setFaq(data.faqs);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch faq");
        }
      } catch (error) {
        console.error("Error fetching faq:", error);
        toast.error("Failed to load faq");
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
        <PageHeader
          title="Frequently Asked Questions"
          className="text-start w-fit !text-md "
        />

        <Link href="/dashboard/faq/add">
          <Button>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add Faq
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faq.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.question.slice(0, 40) + "...."}</TableCell>
              <TableCell>{item.answer.slice(0, 40) + "...."}</TableCell>
              <TableCell>{item.order}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/faq/edit/${item.id}`}>
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

export default FaqPage;
