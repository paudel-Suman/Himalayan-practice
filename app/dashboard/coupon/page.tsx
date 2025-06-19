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

const CouponPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
                <TableCell>{item.couponCount}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>Rs.{item.discountAmount}</TableCell>
                <TableCell>{item.discountPercent}</TableCell>
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
