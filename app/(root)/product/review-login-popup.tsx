"us eclient";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import { useMyContext } from "@/app/(root)/context/store";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoute";

const ReviewLoginPopup = ({ onClose }: { onClose: () => void }) => {
  const { store, login } = useMyContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    const addPendingItemToReview = async () => {
      const pendingItem = localStorage.getItem("pendingReviewItem");

      if (pendingItem && store?.auth?.token) {
        const parsedItem = JSON.parse(pendingItem);

        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_API}/review/add-review`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.auth.token}`,
              },
              body: JSON.stringify({
                comment: parsedItem.comment,
                rating: parsedItem.rating,
                productId: parsedItem.productId,
              }),
            }
          );

          localStorage.removeItem("pendingReviewItem");

          router.refresh(); // Refresh current page
          onClose(); // Close modal
          window.dispatchEvent(new Event("review-submitted"));
          window.dispatchEvent(new Event("clear-review-form"));
        } catch (error) {
          console.error("Error adding pending wishlist item:", error);
        }
      }
    };

    addPendingItemToReview();
  }, [store?.auth?.token]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed:", data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }

      if (res.ok) {
        login(
          {
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role,
            avatar: data.data.avatar,
          },
          data.data.token
        );
        toast.success("Login successful");
        router.refresh();
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_ROUTES.AUTH.GOOGLE_LOGIN}`;
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[10] flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-zinc-50  rounded-lg md:p-6 p-4 w-[90%] max-w-md shadow-lg text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight ">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-gray-900">
                Please sign in to your account
              </p>
            </div>

            <Card className="w-full overflow-hidden border shadow-none">
              <CardContent className="relative space-y-6 pb-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`h-11 transition-all duration-200 ${
                        errors.email
                          ? "border-red-500 ring-red-100"
                          : "focus:ring-2 focus:ring-primary/20"
                      }`}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`h-11 transition-all duration-200 ${
                          errors.password
                            ? "border-red-500 ring-red-100"
                            : "focus:ring-2 focus:ring-primary/20"
                        } pr-10`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-green-600 font-medium transition-all duration-200 hover:shadow-md hover:translate-y-[-1px]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative text-xs uppercase">
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleGoogleLogin();
                      }}
                      className="w-full h-11 transition-all duration-200 "
                      disabled={isLoading}
                    >
                      <Icon
                        icon="flat-color-icons:google"
                        width="48"
                        height="48"
                      />
                      <span className="sr-only">Google</span>
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="relative flex justify-center ">
                <p className="text-sm text-muted-foreground">
                  Don t have an account?{" "}
                  <Link
                    href={`/register`}
                    className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewLoginPopup;
