"use client";
import PageHeader from "@/components/text/page-header";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
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
import Image from "next/image";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import { SocialType } from "@/types/social";
import Cookies from "js-cookie";
import { Badge } from "@/components/ui/badge";

const SocialLinkPage = () => {
  const token = Cookies.get("token");
  const [socialLinks, setSocialLinks] = useState<SocialType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/delete-social-media/${id}`, 
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setSocialLinks((prev) => prev.filter((item) => item.id !== id));
        toast.success("Social Link Deleted Successfully");
      } else {
        toast.error("Failed to Delete Social Link");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/fetch-all-social-media`
        );

        const data = await res.json();
        setSocialLinks(data.setting);
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
    fetchSocialMedia();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between mb-6">
        <PageHeader
          title="Social  Links"
          className="text-start w-fit !text-md "
        />

        <div className="flex gap-4">
          <Link href="/dashboard/social/add">
            <Button>
              <Icon icon="gridicons:add" width="24" height="24" />
              Add Social Links
            </Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>Url</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>isActive</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {socialLinks.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.platform}</TableCell>
              <TableCell>{item.url.slice(0, 40)}</TableCell>
              <TableCell>
                <Image
                  src={
                    item.iconUrl ||
                    "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={item.platform}
                  width={100}
                  height={100}
                  className="h-14 w-14 object-cover"
                />
              </TableCell>
              <TableCell>{item.order}</TableCell>
              <TableCell>
                {item.isActive ? (
                  <Badge className="bg-green-500">Yes</Badge>
                ) : (
                  <Badge className="bg-red-500">No</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/social/edit/${item.id}`}>
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

export default SocialLinkPage;
