"use client";
import React, { useEffect, useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const BannerEditPage = () => {
  const params = useParams(); 
  const id = params.id as string;
  const token = Cookies.get("token");
  const [displayImage, setDisplayImage] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const [bannerImage, setBannerImage] = useState("");
  const [bannerdisplayImage, setBannerDisplayImage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    position: "",
    isActive: true,
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

  useEffect(() => {
    const fetchSingleBanner = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/banner/fetch-banner-by-id/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch coupon");
        }

        const bannerData = data.banner;

        setFormData({
          title: bannerData.title || "",
          description: bannerData.description || "",
          buttonText: bannerData.buttonText || "",
          buttonLink: bannerData.buttonLink || "",
          position: bannerData.position || "",
          displayNumber: bannerData.displayNumber || 0,
          displayText: bannerData.displayText || "",
          displayImage:
            (bannerData.displayImage &&
              setBannerDisplayImage(bannerData.displayImage)) ||
            "",
          image: (bannerData.image && setBannerImage(bannerData.image)) || "",
          isActive: bannerData.isActive || false,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load coupon");
      }
    };

    fetchSingleBanner();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/banner/update-banner/${id}`,
        {
          method: "PUT",
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
            isActive: formData.isActive,
            displayNumber: formData.displayNumber,
            displayText: formData.displayText,
            displayImage: displayImage || bannerdisplayImage,
            image: image || bannerImage,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Banner Updated Successfully");
      router.push("/dashboard/banner");
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
            <BreadcrumbPage className="text-green-500">Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Edit Banner</h2>

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
            <Label>Is Active</Label>
            <div className="flex flex-col gap-1">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="isActive"
                  value="true"
                  className="h-4 w-4"
                  checked={formData.isActive === true}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: true,
                    }))
                  }
                />
                <span>True</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="isActive"
                  value="false"
                  checked={formData.isActive === false}
                  className="h-4 w-4"
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: false,
                    }))
                  }
                />
                <span>False</span>
              </label>
            </div>
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

        <figure>
          {bannerImage && (
            <Image
              src={bannerImage}
              alt="banner-image"
              width={500}
              height={500}
              className="h-[20em] w-full object-contain"
            />
          )}
        </figure>
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

        <figure>
          {bannerdisplayImage && (
            <Image
              src={bannerdisplayImage}
              alt="banner-image"
              width={500}
              height={500}
              className="h-[20em] w-full object-contain"
            />
          )}
        </figure>

        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default BannerEditPage;
