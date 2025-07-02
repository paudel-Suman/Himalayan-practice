"use client";
import PageHeader from "@/components/text/page-header";
import { Icon } from "@iconify/react/dist/iconify.js";
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
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { contactType } from "@/types/contact";
import { Label } from "@/components/ui/label";

const InboxPage = () => {
  const [inbox, setInbox] = useState<contactType[]>([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/contact/fetch-all-contact`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data.data.contacts);
        setInbox(data.data.contacts);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch inbox");
        }
      } catch (error) {
        console.error("Error fetching inbox:", error);
        toast.error("Failed to load inbox");
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
        <PageHeader title="Inbox" className="text-start w-fit !text-md " />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inbox.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone.slice(0, 15)}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.message.slice(0, 40) + "...."}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger
                      onClick={() => setSelectedMessage(item.message)}
                    >
                      <Icon icon="iconamoon:eye-light" width="24" height="24" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogDescription className="space-y-4">
                          <Label>Message</Label>
                          <div className="whitespace-pre-line my-4 border rounded-md p-4">
                            {selectedMessage}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogCancel className="bg-red-500 text-white">
                        Cancel
                      </AlertDialogCancel>
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

export default InboxPage;
