"use client";
import PageHeader from "@/components/text/page-header";
import { Input } from "@/components/ui/input";
import { couponService } from "@/services/superadmin/coupon-service";
import { Coupon } from "@/types/coupon";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loading from "@/app/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

const CouponPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const token = Cookies.get("token");

  // const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>(coupons);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const fetchCoupons = async (pageNumber = 1) => {
    try {
      const coupons = couponService.fetchAllCoupons(pageNumber);
      setCoupons((await coupons).data.coupons);
      // setTotalPages((await coupons).data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };
  useEffect(() => {
    searchCustomer();
  }, [searchQuery]);
  const searchCustomer = async () => {
    if (searchQuery === " ") {
      // setFilteredCoupons(coupons);
    } else {
      // const customers = customerService.searchCustomer(searchQuery);
      // setCoupons((await customers).customers);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/coupon/delete-coupon/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setCoupons((prev) => prev.filter((item) => item.id !== id));
        toast.success("Coupon Deleted Successfully");
      } else {
        toast.error("Failed to Delete Coupon");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between">
        <PageHeader
          title="Coupons"
          className="text-start w-fit !text-md mb-8"
        />
        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearch}
        />

        <Link href="/dashboard/coupon/add">
          <Button>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add Coupon
          </Button>
        </Link>
      </div>

      {coupons.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Coupon Count</TableHead>
              <TableHead>Discount Type</TableHead>
              <TableHead>Discount Amount</TableHead>
              <TableHead>Discount Percentage</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.code}</TableCell>
                <TableCell>
                  {moment(item.expiryDate).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.couponCount < 10
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }
                  >
                    {item.couponCount}
                  </Badge>{" "}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                {(item.discountAmount ?? 0) > 0 ? (
                  <TableCell>Rs.{item.discountAmount}</TableCell>
                ) : (
                  <TableCell>-</TableCell>
                )}
                {(item.discountPercent ?? 0) > 0 ? (
                  <TableCell>{item.discountPercent}%</TableCell>
                ) : (
                  <TableCell>-</TableCell>
                )}
                <TableCell>
                  {moment(item.createdAt).format("MMMM Do YYYY")}
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
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="font-semibold text-2xl text-red-500">
            No Coupons Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default CouponPage;
