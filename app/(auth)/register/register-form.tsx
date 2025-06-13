"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
// import { API_ROUTES } from "@/constants/apiRoutes";
// import { RegionService } from "@/services/region/regionService";
// import { showError } from "@/lib/toastHelper";
// import { MESSAGES } from "@/constants/messages";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const [regionId, setRegionId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "First name is required";
      valid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
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
      toast.success("Registration Successfull");
      router.push(`verifyEmail?email=${encodeURIComponent(data.data.email)}`);
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  //   const handleGoogleLogin = () => {
  //     if (regionId != null)
  //       window.location.href = `${API_ROUTES.AUTH.GOOGLE_LOGIN}?regionId=${regionId}`;
  //   };
  //   const fetchRegionBySymbol = async () => {
  //     const country = params.country;
  //     if (typeof country === "string") {
  //       const response = await RegionService.fetchRegionBySymbol(country);
  //       if (response.success && response.region.code != null) {
  //         setRegionId(response.region.code);
  //       }
  //     } else {
  //       showError(MESSAGES.ERROR.SOMETHING_WENT_WRONG);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchRegionBySymbol();
  //   }, []);
  return (
    <Card className="w-full overflow-hidden border-0 shadow-lg">
      <CardContent className="relative space-y-6 ">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John"
              autoComplete="given-name"
              value={formData.name}
              onChange={handleChange}
              className={`h-11 transition-all duration-200 ${
                errors.name
                  ? "border-red-500 ring-red-100"
                  : "focus:ring-2 focus:ring-primary/20"
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-500">{errors.name}</p>
            )}
          </div>

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
              <p className="text-xs font-medium text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`h-11 transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-red-500 ring-red-100"
                    : "focus:ring-2 focus:ring-primary/20"
                } pr-10`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs font-medium text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-medium transition-all duration-200 hover:shadow-md "
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
        </div>

        <div className="relative">
          <div className="relative text-xs uppercase">
            <Button
              variant="outline"
              onClick={() => {
                // handleGoogleLogin();
              }}
              className="w-full h-11 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
              disabled={isLoading}
            >
              <Icon icon="flat-color-icons:google" width="48" height="48" />
              <span className="sr-only">Google</span>
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/login`}
            className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
