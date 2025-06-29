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
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import S3UploadForm from "@/lib/s3upload-form";
import Image from "next/image";

const SocialLinkAddPage = () => {
  const params = useParams();
  const id = params.id as string;
  const token = Cookies.get("token");
  const router = useRouter();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialImage, setSocialImage] = useState("");
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    iconUrl: "",
    isActive: true,
    order: 0,
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

  useEffect(() => {
    const fetchSingleSocial = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/fetch-social-media-by-id/${id}`,
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

        const socialData = data.setting;

        setFormData({
          platform: socialData.platform || "",
          url: socialData.url || "",
          order: socialData.order || 0,
          isActive: socialData.isActive || false,
          iconUrl:
            (socialData.iconUrl && setSocialImage(socialData.iconUrl)) || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load Social Link");
      }
    };

    fetchSingleSocial();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/update-social-media/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            platform: formData.platform,
            url: formData.url,
            iconUrl: image || socialImage,
            isActive: formData.isActive,
            order: Number(formData.order),
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      router.push("/dashboard/social");
      toast.success("Social Media Link Added Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSocialImage = (urls: string[]) => {
    setImage(urls[0]);
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
              <Link href="/dashboard/social">Social</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Edit Social Links</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>PLatform</Label>
            <Input
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="Facebook"
              className="bg-white shadow-none"
              maxLength={15}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Url</Label>
            <Input
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://www.facebook.com/himalayagarment"
              maxLength={70}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              placeholder="1"
              max={10}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Display Image</Label>
            <S3UploadForm
              id={"social-image"}
              multiple={false}
              onUploadComplete={handleSocialImage}
            />
          </div>
          <div className="space-y-2">
            <Label>Is Active</Label>
            <div className="flex  gap-4">
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
        <figure>
          {socialImage && (
            <Image
              src={socialImage}
              alt="social-image"
              width={500}
              height={500}
              className="h-[20em] w-full object-contain"
            />
          )}
        </figure>
        <Button disabled={loading}>
          {loading ? (
            <div className="flex gap-2">
              <Loader className="animate-spin h-4 w-4" />
              Updating
            </div>
          ) : (
            "Update"
          )}
        </Button>{" "}
      </form>
    </div>
  );
};

export default SocialLinkAddPage;
