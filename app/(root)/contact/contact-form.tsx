"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
    phone: "",
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
        `${process.env.NEXT_PUBLIC_SERVER_API}/contact/add-contact`,
        {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            address: formData.address,
            message: formData.message,
            phone: formData.phone,
          }),
        }
      );
      console.log(
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          address: formData.address,
          message: formData.message,
          phone: formData.phone,
        })
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }

      toast.success("Contact Submitted Successfully");
      setFormData({
        name: "",
        email: "",
        address: "",
        message: "",
        phone: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="!mt-10 space-y-4">
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <Label>Full Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            maxLength={20}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Email Address</Label>

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            maxLength={20}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <Label>Contact Number</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+977-9800000000"
            maxLength={15}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Address</Label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Subject matter"
            maxLength={15}
          />
        </div>
      </div>
      <div>
        <Label>Message</Label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={10}
          className="p-4 rounded-lg border-primary-600/50 outline-none text-sm  border w-full"
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
  );
};

export default ContactForm;
