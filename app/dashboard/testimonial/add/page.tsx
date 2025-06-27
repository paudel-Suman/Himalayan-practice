"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import S3UploadForm from "@/lib/s3upload-form";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const TestimonialAddPage = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const handleUploadAvatar = (urls: string[]) => {
    setImage(urls[0]);
  };
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    avatar: "",
    designation: "",
  });

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
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/testimonial/create-testimonial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            message: formData.message,
            designation: formData.designation,
            avatar: image,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Testimonial Added Successfully");
      router.push("/dashboard/testimonial");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/testimonial">Testimonials</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="text-xl font-bold mt-10">Add Testimonial</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="bg-white shadow-none"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Designation</Label>
            <Input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="CEO"
              className="bg-white shadow-none"
              required
            />
          </div>
        </section>
        <div className="space-y-2">
          <Label>Message</Label>
          <textarea
            className="w-full bg-white rounded-md p-2"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows={8}
            required
          ></textarea>
        </div>
        <div className="space-y-2">
          <Label>Avatar</Label>
          <S3UploadForm
            id={"avatar"}
            multiple={false}
            onUploadComplete={handleUploadAvatar}
            isrequired={true}
          />
        </div>
        <Button disabled={loading}>
          {loading ? (
            <div className="flex gap-2">
              <Loader className="animate-spin h-4 w-4" />
              Submitting
            </div>
          ) : (
            "Submit"
          )}
        </Button>{" "}
      </form>
    </div>
  );
};

export default TestimonialAddPage;
