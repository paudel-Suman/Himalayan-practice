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
import S3UploadForm from "@/lib/s3upload-form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const CompanyAddPage = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [logo, setLogo] = useState("");
  const [footerLogo, setFooterLogo] = useState("");
  const [prevfavicon, setPrevFavicon] = useState("");
  const [prevlogo, setPrevLogo] = useState("");
  const [prevfooterLogo, setPrevFooterLogo] = useState("");
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
    phoneNumber: 0,
    whatsappNumber: 0,
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

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/fetch-site-setting`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch coupon");
        }

        const companyData = data.setting;

        setFormData({
          siteName: companyData.siteName || "",
          siteDescription: companyData.siteDescription || "",
          contactEmail: companyData.contactEmail || "",
          address: companyData.address || "",
          metaTitle: companyData.metaTitle || "",
          metaDescription: companyData.metaDescription || "",
          phoneNumber: companyData.phoneNumber || 0,
          whatsappNumber: companyData.whatsappNumber || 0,
          faviconUrl:
            (companyData.faviconUrl &&
              setPrevFavicon(companyData.faviconUrl)) ||
            "",
          logoUrl:
            (companyData.logoUrl && setPrevLogo(companyData.logoUrl)) || "",
          footerLogoUrl:
            (companyData.footerLogoUrl &&
              setPrevFooterLogo(companyData.footerLogoUrl)) ||
            "",
        });

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        toast.error("Failed to load company data");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyProfile();
  }, []);

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
            phoneNumber: formData.phoneNumber,
            whatsappNumber: formData.whatsappNumber,
            metaTitle: formData.metaTitle,
            metaDescription: formData.metaDescription,
            faviconUrl: favicon || prevfavicon,
            logoUrl: logo || prevlogo,
            footerLogoUrl: footerLogo || prevfooterLogo,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Company Data Updated Successfully");
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
            <BreadcrumbPage className="text-green-500">Update</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Update Company Info</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              placeholder="Himalayan Garment"
              className="bg-white shadow-none"
              maxLength={20}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              type="number"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="980000000"
              maxLength={10}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="himalaya@info.com"
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
              placeholder="Kathmandu,Nepal"
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
              placeholder="Himalaya Garment"
              maxLength={70}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Whatsapp Number</Label>
            <Input
              name="whatsappNumber"
              type="number"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="1"
              required
            />
          </div>
        </section>
        <div>
          <Label>Site Description</Label>
          <textarea
            className="w-full bg-white rounded-md p-2"
            name="siteDescription"
            value={formData.siteDescription}
            onChange={handleChange}
            placeholder="Description of the Site"
            rows={8}
            required
          ></textarea>
        </div>
        <div>
          <Label>Meta Description</Label>
          <textarea
            className="w-full bg-white rounded-md p-2"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            placeholder="Best Garment Industry in Nepal"
            rows={8}
            required
          ></textarea>
        </div>
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>FavIcon</Label>
            <S3UploadForm
              id={"favicon"}
              multiple={false}
              onUploadComplete={handleFavicon}
              isrequired={false}
            />

            <figure>
              {prevfavicon && (
                <Image
                  src={prevfavicon}
                  alt="favicon-prev"
                  width={500}
                  height={500}
                  className="h-[15em] w-full object-contain"
                />
              )}
            </figure>
          </div>
          <div className="space-y-2">
            <Label>logo</Label>
            <S3UploadForm
              id={"logo"}
              multiple={false}
              onUploadComplete={handleLogo}
              isrequired={false}
            />

            <figure>
              {prevlogo && (
                <Image
                  src={prevlogo}
                  alt="logo-prev"
                  width={500}
                  height={500}
                  className="h-[15em] w-full object-contain"
                />
              )}
            </figure>
          </div>
          <div className="space-y-2">
            <Label>Footer Logo</Label>
            <S3UploadForm
              id={"footer-logo"}
              multiple={false}
              onUploadComplete={handleFooterlogo}
              isrequired={false}
            />

            <figure>
              {prevfooterLogo && (
                <Image
                  src={prevfooterLogo}
                  alt="footer-prev"
                  width={500}
                  height={500}
                  className="h-[15em] w-full object-contain"
                />
              )}
            </figure>
          </div>
        </section>
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

export default CompanyAddPage;
