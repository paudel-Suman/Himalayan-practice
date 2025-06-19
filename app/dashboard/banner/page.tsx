"use client";
import PageHeader from "@/components/text/page-header";
import { bannerService } from "@/services/superadmin/banner-service";
import { bannerType } from "@/types/banner";
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

const BannerPage = () => {
  const [banners, setBanners] = useState<bannerType[]>([]);
  const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const fetchBanners = async (pageNumber = 1) => {
    try {
      const response = await bannerService.fetchAllBanners(pageNumber);
      setBanners((await response).data.banners);
      // setTotalPages((await response).data.meta.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <PageHeader title="Banner" className="text-start w-fit !text-md mb-8" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Button Text</TableHead>
            <TableHead>Button Link</TableHead>

            <TableHead>Created Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="h-14 w-14 object-cover"
                />
              </TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.buttonText}</TableCell>
              <TableCell>{item.buttonLink}</TableCell>
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

export default BannerPage;
