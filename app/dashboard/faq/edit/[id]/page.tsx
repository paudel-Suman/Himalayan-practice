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
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const FaqEditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const token = Cookies.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
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
    const fetchSingleFaq = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/faq/fetch-faq-by-id/${id}`,
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

        const faqData = data.faq;

        setFormData({
          question: faqData.question || "",
          answer: faqData.answer || "",
          order: faqData.order || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load Faq");
      }
    };

    fetchSingleFaq();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/faq/update-faq/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: formData.question,
            answer: formData.answer,
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
      toast.success("Faq Added Successfully");
      router.push("/dashboard/faq");
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
              <Link href="/dashboard/faq">Faq</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="text-xl font-bold mt-10">Add Faq</h2>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid  gap-6">
          <div className="space-y-2">
            <Label>Question</Label>
            <Input
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="How to order in Himlaayan Garment ?"
              className="bg-white shadow-none"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Answer</Label>
            <textarea
              className="w-full bg-white rounded-md p-2"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="You can order in Himlaayan Garment by clicking on the button on the top right corner of the website."
              rows={8}
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              placeholder="1"
              className="bg-white shadow-none"
              required
            />
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

export default FaqEditPage;
