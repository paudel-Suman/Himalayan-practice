"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import {  usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMyContext } from "../context/store";
import SpinLoader from "@/app/spin-loader";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { store } = useMyContext();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useMyContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = store.auth.token || localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }

    setLoading(false);
  }, [router, pathname, store.auth.token]);

  const handleLogout = async () => {
    logout();
  };

  const profilelinks = [
    {
      title: "Profile",
      href: `/profile`,
      icon: <Icon icon="iconamoon:profile-fill" />,
    },
    {
      title: "Orders",
      href: `/profile/orders`,
      icon: <Icon icon="lsicon:order-filled" />,
    },
    {
      title: "WishList",
      href: `/profile/wishlist`,
      icon: <Icon icon="tabler:heart-filled" />,
    },
    {
      title: "Cart",
      href: `/profile/cart`,
      icon: <Icon icon="mynaui:cart-solid" />,
    },
  ];

  if (loading) return <SpinLoader />;

  if (!isAuthenticated) return null;

  return (
    <div className="w-full max-w-5xl lg:max-w-7xl xl:mx-auto mx-2 my-8">
      <section className="grid md:grid-cols-10 gap-4">
        <div className="md:col-span-2 col-span-full flex items-start  md:flex-col space-x-4 space-y-2">
          {profilelinks.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={`${
                item.href === pathname
                  ? "bg-green-400/40 bg-opacity-10"
                  : "bg-zinc-50"
              } hover:bg-green-400/40 flex justify-center md:justify-start items-center gap-2 md:p-4 p-2 md:h-fit md:w-full h-10 w-10 rounded-md`}
            >
              <span>{item.icon}</span>
              <p className="font-medium text-md md:block hidden">
                {item.title}
              </p>
            </Link>
          ))}

          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white p-5 px-8 md:mt-8 flex items-center gap-2"
          >
            <Icon icon="ic:round-logout" width="24" height="24" />
            <span className="md:block hidden"> Log Out</span>
          </Button>
        </div>
        <div className="md:col-span-8 col-span-full bg-zinc-50 p-4 overflow-x-scroll">
          {children}
        </div>
      </section>
    </div>
  );
}
