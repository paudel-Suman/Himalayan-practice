"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/lib/logout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "../loading";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [openSidebar, setOpenSidebar] = useState(false);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/admin");
      toast.error("Please Login to Continue");
    } else {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    setOpenSidebar(false);
  }, [pathname]);
  if (isChecking) return <Loading />;

  return (
    <main className="grid grid-cols-12 bg-gradient-to-br from-zinc-50/50 via-zinc-50 to-sky-200/50">
      <section className="bg-white border-r shadow-sm col-span-2 lg:block hidden h-screen sticky top-0">
        {/* company logo */}
        <div className="h-16 bg-[#F7F7F7] border flex justify-center items-center">
          <Image
            src="/logo/mainlogo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="w-40 h-10 object-contain"
          />
        </div>

        {/* sidebar menu items */}
        <div className=" p-2">
          {navitems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={`${
                pathname === item.path
                  ? "bg-[#2089CA]   rounded-md text-white "
                  : "hover:bg-zinc-100 rounded-md"
              } flex  items-center gap-4 p-2`}
            >
              <div className="bg-white p-1 rounded-full">
                {" "}
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="h-5 w-5"
                />
              </div>
              <h2 className="font-medium text-sm ">{item.title}</h2>
            </Link>
          ))}
        </div>
      </section>

      <div
        className={`${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } ease-in-out duration-300 fixed z-[10] top-0 bg-white  h-screen w-full left-0 lg:hidden`}
      >
        <div className="flex justify-between items-center mx-4 mt-4 mb-6">
          <Image
            src="/logo/mainlogo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="w-32  object-cover"
          />

          <span onClick={() => setOpenSidebar(false)}>
            <Icon icon="hugeicons:cancel-01" width="16" height="16" />
          </span>
        </div>
        <div className=" p-2">
          {navitems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={`${
                pathname === item.path
                  ? "bg-[#2089CA] rounded-md text-white "
                  : ""
              } flex items-center gap-4 p-2`}
            >
              <div className="bg-white p-1 rounded-full">
                {" "}
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="h-5 w-5"
                />
              </div>
              <h2 className="font-medium text-sm ">{item.title}</h2>
            </Link>
          ))}

          <button
            onClick={() => {
              logout();
            }}
            className="mt-4 bg-red-500 px-6 py-2 rounded-md flex items-center gap-2 text-white"
          >
            <Icon
              icon="material-symbols-light:logout-rounded"
              width="24"
              height="24"
            />
            LogOut
          </button>
        </div>
      </div>

      {/* main content section */}
      <section className="!overflow-y-scroll lg:col-span-10 col-span-full">
        {/* user profile icon */}
        <div className="h-16 bg-white border flex justify-between px-4 items-center">
          <div className="flex items-center gap-2">
            <span
              className="lg:hidden block"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <Icon icon="pajamas:hamburger" width="16" height="16" />
            </span>
            <h2 className="md:text-lg font-bold text-zinc-950">
              Admin Dashboard
            </h2>
          </div>

          <Popover>
            <PopoverTrigger>
              <Image
                src="/admin.webp"
                alt="avatar"
                width={1000}
                height={1000}
                className="h-14 w-14 rounded-full "
              />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <h2 className="font-bold text-sm">My Account</h2>
              <div className="text-sm space-y-4 mt-2">
                {/* <h2 className=" text-black bg-zinc-200 hover:bg-zinc-300 ease-in-out duration-500 cursor-pointer font-medium py-2 text-center rounded-md w-full">
                  Settings
                </h2> */}
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="bg-red-500 hover:bg-red-600 ease-in-out duration-500 text-white font-medium py-2 rounded-md w-full mt-2"
                >
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* main content */}
        <div className="p-4">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;

const navitems = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: "/icons/overview.png",
  },
  {
    title: "Customers",
    path: "/dashboard/customers",
    icon: "/icons/jobs.png",
  },

  {
    title: "Category",
    path: "/dashboard/category",
    icon: "/icons/services.png",
  },

  {
    title: "Products",
    path: "/dashboard/products",
    icon: "/icons/gallery.png",
  },
  {
    title: "Inactive Products",
    path: "/dashboard/inactiveproducts",
    icon: "/icons/gallery.png",
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: "/icons/certificate.png",
  },
  {
    title: "Blogs",
    path: "/dashboard/blogs",
    icon: "/icons/client.png",
  },
  {
    title: "Coupon",
    path: "/dashboard/coupon",
    icon: "/icons/testimonials.png",
  },
  {
    title: "Banner",
    path: "/dashboard/banner",
    icon: "/icons/book.png",
  },
];
