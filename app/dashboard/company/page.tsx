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
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import Image from "next/image";
import { CompanyType } from "@/types/company";
// import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

const CompanyProfilePage = () => {
  // const token = Cookies.get("token");
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleDelete = async (id: any) => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/delete-social-media/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (res.ok) {
  //       toast.success("Profile  Deleted Successfully");
  //     } else {
  //       toast.error("Failed to Delete Profile ");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/fetch-site-setting`
        );

        const data = await res.json();
        setCompany(data.setting);
        console.log(data.setting.metaTitle);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        toast.error("Failed to load company data");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyProfile();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
        <PageHeader
          title="Company Profile"
          className="text-start w-fit !text-md "
        />

        {!company && (
          <div className="flex md:gap-4 gap-2">
            <Link href="/dashboard/company/add">
              <Button>
                <Icon icon="gridicons:add" width="24" height="24" />
                Add Company Info
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Site Name</TableHead>
            <TableHead>Favicon</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Footer Logo</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{company?.siteName}</TableCell>
            <TableCell>
              <Image
                src={
                  company?.faviconUrl ||
                  "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={"logo"}
                width={100}
                height={100}
                className="h-14 w-14 object-cover"
              />
            </TableCell>
            <TableCell>
              <Image
                src={
                  company?.logoUrl ||
                  "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={"logo"}
                width={100}
                height={100}
                className="h-14 w-14 object-cover"
              />
            </TableCell>
            <TableCell>
              <Image
                src={
                  company?.footerLogoUrl ||
                  "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={"logo"}
                width={100}
                height={100}
                className="h-14 w-14 object-cover"
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <Link href={`/dashboard/company/edit/${company?.id}`}>
                  <Icon
                    icon="lucide:edit"
                    width="20"
                    height="20"
                    className="text-blue-500"
                  />
                </Link>
                {/* <AlertDialog>
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
                        onClick={() => handleDelete(company?.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog> */}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyProfilePage;
