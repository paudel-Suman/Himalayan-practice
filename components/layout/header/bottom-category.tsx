import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectGroup,
//   SelectLabel,
//   SelectValue,
// } from "@/components/ui/select";
import { useMyContext } from "@/app/(root)/context/store";
import { getCategory } from "@/actions/fetchapi";
import { categoryType } from "@/types/category";

const BottomCategory = () => {
  const { store, logout } = useMyContext();
  const [isOpen, setIsOpen] = useState(false);
  const currentRoute = usePathname();
  const { cartCount } = useMyContext(); 

  useEffect(() => {
    setIsOpen(false);
  }, [currentRoute]);

  const [category, setCategory] = useState<categoryType[]>([]);
  const handleLogout = async () => {
    logout();
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const products = await getCategory();
        setCategory(products);
      } catch (error) {
        console.error("Failed to fetch Category:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="bg-primarymain min-h-8 p-2 text-white">
      <div className="max-w-7xl mx-auto flex justify-between gap-6">
        <div className="md:flex hidden gap-6">
          {category.map((item) => (
            <div key={item.id}>
              <Link
                href={`/search?categoryId=${item.id}`}
                className="text-sm hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
          <Icon icon="quill:hamburger" width="32" height="32" />
        </div>

        <div className="flex items-center md:gap-6 gap-2">
          <Link href="/cart" className="relative">
            <Icon icon="mdi:cart" width="24" height="24" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/profile/wishlist">
            <Icon icon="ri:heart-fill" width="24" height="24" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Icon
                icon="iconamoon:profile-circle-fill"
                width="24"
                height="24"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {store.auth.token ? (
                <div>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={handleLogout}>Logout</button>
                  </DropdownMenuItem>
                </div>
              ) : (
                <div>
                  <DropdownMenuItem>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register">Register</Link>{" "}
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isOpen && (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] xl:hidden"
          />
        )}

        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-500 h-screen xl:hidden fixed top-0 bg-white z-[2] p-4 left-0 w-60 `}
        >
          <Link href="/" className="md:hidden block">
            <Image
              src="/logo/mainlogo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="object-cover w-32"
            />
          </Link>

          <div className="flex flex-col  gap-2 mt-6">
            {navlinks.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className="font-medium text-black border-b py-2"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2"></div>

          {/* <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent className="w-full flex flex-col">
              {category.map((item) => (
                <div key={item.id}>
                  <Link
                    href={`/search?categoryId=${item.id}`}
                    className="font-medium text-black border-b py-2"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </SelectContent>
          </Select> */}
        </div>
      </div>
    </div>
  );
};

export default BottomCategory;

const navlinks = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blogs",
    path: "/blogs",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
