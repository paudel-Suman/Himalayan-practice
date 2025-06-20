"use client";
import React from "react";
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

const BannerAddPage = () => {
  // const [bannerImage, setBannerImage] = useState<File | null>(null);
  // const [displayImage, setDisplayImage] = useState<File | null>(null);
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: 0,
  //   image: "",
  //   buttonText: "",
  //   buttonLink: "",
  //   position: "",
  //   isActive: "",
  //   displayImage: "",
  //   displayNumber: "",
  //   displayText: "",
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setBannerImage(file);
  //   }
  // };

  // const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setDisplayImage(file);
  //   }
  // };

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

      <form className="my-8 space-y-6">
        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Banner Title</Label>
            <Input
              name="title"
              placeholder="Great Friday Sales"
              className="bg-white shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input name="buttonText" placeholder="Know More" />
          </div>
          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input name="buttonLink" placeholder="https://google.com" />
          </div>
        </section>
        <div className="space-y-2">
          <Label>Banner Image</Label>
          <Input type="file" name="image" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            className="w-full bg-white rounded-md p-2"
            rows={8}
          ></textarea>
        </div>

        <section className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Display Image</Label>
            <Input type="file" name="image" />
          </div>

          <div className="space-y-2">
            <Label>Display Number</Label>
            <Input name="displayNumber" type="number" placeholder="16557" />
          </div>
          <div className="space-y-2">
            <Label>Display Text</Label>
            <Input name="displayText" placeholder="Display Image Text" />
          </div>
        </section>

        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default BannerAddPage;
