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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [addCategory, setAddCategory] = useState(false);
  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    title: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/blog-category/add-blog-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Blog Category Added Successfully");
      setAddCategory(false);
      // router.push("/dashboard/coupon");
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/blog/delete-blog/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setBlogs((prev) => prev.filter((item) => item.id !== id));
        toast.success("Product Deleted Successfully");
      } else {
        toast.error("Failed to Delete Product");
      }
    } catch (error) {
      console.error(error);
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
    <div className="relative">
      <div className="flex justify-between">
        <PageHeader title="Blogs" className="text-start w-fit !text-md mb-8" />

        <div className="flex gap-4">
          <Button onClick={() => setAddCategory(!addCategory)}>
            <Icon icon="gridicons:add" width="24" height="24" />
            Add Category
          </Button>
          <Link href="/dashboard/blogs/add">
            <Button>
              <Icon icon="gridicons:add" width="24" height="24" />
              Add Blogs
            </Button>
          </Link>
        </div>
      </div>

      {addCategory && (
        <div
          onClick={() => setAddCategory(false)}
          className="bg-black/40 z-[20] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  fixed inset-0 h-screen w-full"
        />
      )}
      <form
        onSubmit={handleSubmit}
        className={`${
          addCategory ? "block" : "hidden"
        }  absolute z-[20] left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2  w-[20em] bg-white rounded-md p-4 space-y-4`}
      >
        <Label>Add Category</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />
        <div className="flex gap-2">
          <Button onClick={() => setAddCategory(false)} variant="destructive">
            Cancel
          </Button>
          <Button>Submit</Button>
        </div>
      </form>

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
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="font-semibold text-2xl text-red-500">
            No Blogs Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
