"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { LoginResponse } from "@/types/auth";
import { AuthService } from "@/services/auth/authService";
import { showError } from "@/lib/toastHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Image from "next/image";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data:any) => {
    const { email, password } = data;
    try {
      const response: LoginResponse = await AuthService.superadminLogin({
        email,
        password,
      });
      if (response.success) {
        const token = response.data.token;
        const role = response.data.role[0].name;
        console.log(role);
        if (typeof window !== "undefined") {
          document.cookie = `token=${token}; path=/; secure; samesite=None;`;
          if (role === "SUPERADMIN") {
            document.cookie = `role=${role}; path=/; secure; samesite=None;`;
            window.location.href = "/dashboard";
          } else {
            showError(`User is not SuperAdmin`);
          }
        }
      } else {
        showError(response.message);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.message || "An error occurred during login");
    }
  };
  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    remember: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  return (
    <div className="h-screen flex flex-col space-y-4 justify-center items-center w-full">
      <Link href="/">
        <Image
          src="/logo/mainlogo.png"
          alt="logo"
          width={1000}
          height={1000}
          className="object-contain w-52"
        />
      </Link>
      <Card className="md:w-[400px] w-[300px]  overflow-hidden shadow-lg ">
        <CardContent className="relative space-y-6 pb-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="border-gray-300 focus:border-[color:var(--primary)] focus:ring-[color:var(--primary)] h-12 transition-all duration-300"
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={() => (
                  <FormItem className="animate-[slideIn_0.4s_ease-out_0.2s_both]">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-700 nunito-text">
                        Password
                      </FormLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-[color:var(--primary)] hover:text-[color:var(--primary)]/80 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...register("password", {
                            required: "Password is required",
                          })}
                          className="border-gray-300 focus:border-[color:var(--primary)] focus:ring-[color:var(--primary)] h-12 pr-10 transition-all duration-300"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                              <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-primarymain font-medium transition-all duration-200 hover:shadow-md hover:translate-y-[-1px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
