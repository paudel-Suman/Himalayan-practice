"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { useMyContext } from "../context/store";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { store, setStore } = useMyContext();
  const [profileData, setProfileData] = useState({ name: "", email: "" });

  useEffect(() => {
    console.log("store", store.auth.user);
    if (store.auth.user) {
      setProfileData({
        name: store.auth.user.name,
        email: store.auth.user.email,
      });
    }
  }, [store.auth.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/auth/update-user-details`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.auth.token}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update profile");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setStore((prev: any) => ({
        ...prev,
        auth: {
          ...prev.auth,
          user: {
            ...prev.auth.user,
            ...data.data,
          },
        },
      }));

      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container ">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your profile information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4 grid sm:grid-cols-2 gap-x-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-4">
            <Button type="submit" className="" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
