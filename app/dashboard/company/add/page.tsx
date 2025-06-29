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
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CompanyAddPage = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [logo, setLogo] = useState("");
  const [footerLogo, setFooterLogo] = useState("");
  const [formData, setFormData] = useState({
    siteName: "",
    siteDescription: "",
    faviconUrl: "",
    logoUrl: "",
    footerLogoUrl: "",
    contactEmail: "",
    address: "",
    metaTitle: "",
    metaDescription: "",
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

  const handleFavicon = (urls: string[]) => {
    setFavicon(urls[0]);
  };
  const handleLogo = (urls: string[]) => {
    setLogo(urls[0]);
  };
  const handleFooterlogo = (urls: string[]) => {
    setFooterLogo(urls[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/create-or-update-site-setting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            siteName: formData.siteName,
            siteDescription: formData.siteDescription,
            contactEmail: formData.contactEmail,
            address: formData.address,
            metaTitle: formData.metaTitle,
            metaDescription: formData.metaDescription,
            faviconUrl: favicon,
            logoUrl: logo,
            footerLogoUrl: footerLogo,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Company Data Added Successfully");
      router.push("/dashboard/company");
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
              <Link href="/dashboard/company">Company</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Add Company Info</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              placeholder="Facebook"
              className="bg-white shadow-none"
              maxLength={20}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Site Description</Label>
            <Input
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleChange}
              placeholder="https://www.facebook.com/himalayagarment"
              maxLength={70}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="1"
              max={10}
              required
            />
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Facebook"
              className="bg-white shadow-none"
              maxLength={20}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Meta Title</Label>
            <Input
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="https://www.facebook.com/himalayagarment"
              maxLength={70}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Input
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="1"
              required
            />
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>FavIcon</Label>
            <S3UploadForm
              id={"favicon"}
              multiple={false}
              onUploadComplete={handleFavicon}
              isrequired={true}
            />
          </div>
          <div className="space-y-2">
            <Label>logo</Label>
            <S3UploadForm
              id={"logo"}
              multiple={false}
              onUploadComplete={handleLogo}
              isrequired={true}
            />
          </div>
          <div className="space-y-2">
            <Label>Footer Logo</Label>
            <S3UploadForm
              id={"footer-logo"}
              multiple={false}
              onUploadComplete={handleFooterlogo}
              isrequired={true}
            />
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

export default CompanyAddPage;
