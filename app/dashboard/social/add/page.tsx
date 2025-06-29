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
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import S3UploadForm from "@/lib/s3upload-form";

const SocialLinkAddPage = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/create-social-media`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            platform: formData.platform,
            url: formData.url,
            iconUrl: image,
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
      toast.success("Social Media Link Added Successfully");
      router.push("/dashboard/social");
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
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Social Links</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Platform</Label>
            <Input
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="Facebook"
              className="bg-white shadow-none"
              maxLength={20}
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
            <Label>Icon</Label>
            <S3UploadForm
              id={"social-image"}
              multiple={false}
              onUploadComplete={handleSocialImage}
              isrequired={true}
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

export default SocialLinkAddPage;
