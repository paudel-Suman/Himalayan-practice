"use client";
import { blogService } from "@/services/superadmin/blog-service";
import { blogType } from "@/types/blogs";
import React, { useEffect, useState } from "react";
// import { showError, showSuccess } from "@/lib/toastHelper";
import PageHeader from "@/components/text/page-header";
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

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [editView, setEditView] = useState(false);
  // const [blog, setBlog] = useState<blogType>();
  // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // const [blogId, setBlogId] = useState("");
  useEffect(() => {
    fetchBlogs();
  }, []);

  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.fetchAllBlogs();

      setBlogs((await response).data.blogs);
      // setTotalPages((await response).data.meta.totalPages);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  // const handleEdit = (blog: blogType) => {
  //   setEditView(true);
  //   setBlog(blog);
  // };

  // const handleDelete = (id: string) => {
  //   setBlogId(id);
  //   setShowDeleteConfirm(true);
  // };

  // const deleteBlog = async () => {
  //   setLoading(true);
  //   const response = await blogService.deleteBlog(blogId);
  //   if (response.success) {
  //     showSuccess(response.message);
  //     fetchBlogs();
  //     setLoading(false);
  //     setShowDeleteConfirm(false);
  //   } else {
  //     showError(response.message);
  //     setLoading(false);
  //   }
  // };

  if (loading) return <Loading />;

  return (
    <div>
      <PageHeader title="Blogs" className="text-start w-fit !text-md mb-8" />

      {blogs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blog Title</TableHead>
              <TableHead>Blog Slug</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell>
                  {" "}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="h-20"
                  />
                </TableCell>

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
            No Blogs Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
