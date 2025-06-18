"use client";
import PageHeader from "@/components/text/page-header";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegionalAdminData } from "@/types/auth";
import { customerService } from "@/services/superadmin/customer-service";
import moment from "moment";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";

const CustomerPage = () => {
  const [customers, setCustomers] = useState<RegionalAdminData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] =
    useState<RegionalAdminData[]>(customers);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerService.fetchAllCustomer();
      const users = response?.data?.users ?? [];
      setCustomers(users);
      setFilteredCustomers(users);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const searchCustomer = async () => {
    if (searchQuery === " ") {
      setFilteredCustomers(customers);
    } else {
      const customers = customerService.searchCustomer(searchQuery);
      setCustomers((await customers).customers);
    }
  };
  useEffect(() => {
    searchCustomer();
  }, [searchQuery]);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex justify-between">
        <PageHeader
          title="Customers"
          className="text-start w-fit !text-md mb-8"
        />

        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Email Verified</TableHead>
            <TableHead>Phone Verified</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.isEmailVerified ? "Yes" : "No"}</TableCell>
              <TableCell>{item.isPhoneVerified ? "Yes" : "No"}</TableCell>
              <TableCell>
                {moment(item.createdAt).format("MMMM Do YYYY")}
              </TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerPage;
