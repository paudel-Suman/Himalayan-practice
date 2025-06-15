import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMyContext } from "@/app/(root)/context/store";

const BottomCategory = () => {
  const { store, logout } = useMyContext();
  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="bg-primarymain p-2 text-white">
      <div className="max-w-7xl mx-auto flex justify-between gap-6">
        <div className="flex gap-6">
          <h2>Womens </h2>
          <h2>Mens </h2>
          <h2>Bags</h2>
        </div>
        <div className="flex gap-6">
          <Link href="/cart">
            <Icon icon="mdi:cart" width="24" height="24" />
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
      </div>
    </div>
  );
};

export default BottomCategory;
