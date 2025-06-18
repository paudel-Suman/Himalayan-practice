"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <main className="grid grid-cols-12 bg-gradient-to-br from-zinc-50/50 via-zinc-50 to-sky-200/50">
      <section className="bg-white col-span-2 h-screen sticky top-0">
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
        </div>
      </section>

      {/* main content section */}
      <section className="!overflow-y-scroll col-span-10">
        {/* user profile icon */}
        <div className="h-16 bg-white border flex justify-between px-4 items-center">
          <h2 className="text-lg font-bold text-zinc-950">Admin Dashboard</h2>
          <Popover>
            <PopoverTrigger>
              <Image
                src="/fav.png"
                alt="avatar"
                width={1000}
                height={1000}
                className="h-12 w-12 rounded-full border-2 border-green-500"
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
                    // handleLogout();
                    // router.push("/login");
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
    path: "/admin",
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
    title: "Product",
    path: "/dashboard/products",
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
