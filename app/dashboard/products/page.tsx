"use client";
import PageHeader from "@/components/text/page-header";
import { Input } from "@/components/ui/input";
import { productService } from "@/services/superadmin/product-service";
import { producttype } from "@/types/product";
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
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loading from "@/app/loading";

const ProductPage = () => {
  const [products, setProducts] = useState<producttype[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<producttype[]>(products);
  // const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log(filteredProducts, totalPages);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (pageNumber = 1) => {
    try {
      const products = productService.fetchAllProducts(pageNumber);
      setProducts((await products).data.products);
      setTotalPages((await products).data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };
  useEffect(() => {
    searchProducts();
  }, [searchQuery]);
  const searchProducts = async () => {
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      const response = productService.searchProduct(searchQuery);
      setProducts((await response).products);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between">
        <PageHeader
          title="Products"
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
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Feature Image</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>Rs .{item.price}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>
                {" "}
                <Image
                  src={
                    item.featureImage ||
                    "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-14 w-14 object-cover"
                />
              </TableCell>
              <TableCell>{item.stock.quantity}</TableCell>
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
    </div>
  );
};

export default ProductPage;
