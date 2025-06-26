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
import { Loader } from "lucide-react";

const BannerEditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const token = Cookies.get("token");
  const [image, setImage] = useState("");
  const router = useRouter();
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    position: "",
    isActive: true,
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
      setLoading(true);
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
      router.push("/dashboard/banner");
      toast.success("Banner Updated Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

        <Button disabled={loading}>
          {loading ? (
            <div className="flex gap-2">
              <Loader className="animate-spin h-4 w-4" />
              Updating
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </main>
  );
};

export default BannerEditPage;
