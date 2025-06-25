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
import { Button } from "@/components/ui/button";
import S3UploadForm from "@/lib/s3upload-form";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const BannerAddPage = () => {
  const token = Cookies.get("token");
  const [displayImage, setDisplayImage] = useState("");
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    position: "",
    isActive: "",
    displayImage: "",
    displayNumber: "",
    displayText: "",
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

  const handleUploadDisplayImageComplete = (urls: string[]) => {
    setDisplayImage(urls[0]);
  };

  const handleUploadComplete = (urls: string[]) => {
    setImage(urls[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/banner/create-banner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            buttonText: formData.buttonText,
            buttonLink: formData.buttonLink,
            position: formData.position,
            displayNumber: formData.displayNumber,
            displayText: formData.displayText,
            displayImage: displayImage,
            image: image,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Banner Added Successfully");
      // router.push("/dashboard/coupon");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="my-4">
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
              <Link href="/dashboard/banner">Banner</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Banner</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>Banner Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Great Friday Sales"
              className="bg-white shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              placeholder="Know More"
            />
          </div>
          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleChange}
              placeholder="https://google.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
        </section>
        <div className="space-y-2">
          <Label>Banner Image</Label>
          <S3UploadForm
            id={"banner-image"}
            multiple={false}
            onUploadComplete={handleUploadComplete}
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            className="w-full bg-white rounded-md p-2"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={8}
          ></textarea>
        </div>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Display Image</Label>
            <S3UploadForm
              id={"display-image"}
              multiple={false}
              onUploadComplete={handleUploadDisplayImageComplete}
            />
          </div>

          <div className="space-y-2">
            <Label>Display Number</Label>
            <Input
              name="displayNumber"
              value={formData.displayNumber}
              onChange={handleChange}
              type="number"
              placeholder="16557"
            />
          </div>
          <div className="space-y-2">
            <Label>Display Text</Label>
            <Input
              name="displayText"
              value={formData.displayText}
              onChange={handleChange}
              placeholder="Display Image Text"
            />
          </div>
        </section>

        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default BannerAddPage;
