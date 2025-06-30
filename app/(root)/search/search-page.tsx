"use client";
import ProductCard from "@/components/card/product-card";
import { categoryType, producttype } from "@/types/product";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import ProductDetailCard from "@/components/card/product-detail-card";

const SearchPage = ({
  product,
  sortBy,
}: {
  product: producttype[];
  sortBy: string;
  categoryId: string;
}) => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const [cardStyle, setCardStyle] = useState("default"); // "default" or "compact"

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/category/fetch-all-categories`
        );

        const data = await res.json();

        setCategories(data.categories);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch Categories");
        }
      } catch (error) {
        console.error("Error fetching Categories:", error);
        toast.error("Failed to Fetch categories");
      }
    };
    fetchCategory();
  }, []);

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sortBy", newSort);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("categoryId", newCategory);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname); // remove all query params
  };

  return (
    <main>
      <section className="flex justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Select onValueChange={handleSortChange} defaultValue={sortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_low_to_high">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price_high_to_low">
                Price: High to Low
              </SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="max-w-[200px] ">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="w-full flex flex-col">
              {categories.map((item: categoryType, index) => (
                <SelectItem key={index} value={item.id} className="text-black">
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={handleClearFilters}
            className="bg-black hover:bg-rose-700 md:px-4 px-2 py-1 rounded-md text-white md:text-sm text-xs flex items-center gap-1"
          >
            <Icon
              icon="material-symbols-light:cancel-rounded"
              width="24"
              height="24"
            />
            Clear Filter
          </button>
        </div>
        <div className="flex md:justify-center justify-between w-full md:w-fit items-center gap-4">
          <p className="text-zinc-500 whitespace-nowrap text-sm font-medium">
            Showing {product.length} results
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCardStyle("default")}
              className={`p-1 rounded ${
                cardStyle === "default" ? "bg-gray-200" : ""
              }`}
              aria-label="Default card view"
            >
              <Icon icon="ion:grid-outline" width="20" height="20" />
            </button>
            <button
              onClick={() => setCardStyle("compact")}
              className={`p-1 rounded ${
                cardStyle === "compact" ? "bg-gray-200" : ""
              }`}
              aria-label="Compact card view"
            >
              <Icon icon="line-md:grid-3-filled" width="20" height="20" />
            </button>
          </div>
        </div>
      </section>

      {product.length > 0 ? (
        <div>
          {cardStyle === "default" ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-8 my-8">
              {product.map((item, index) => (
                <div key={index}>
                  <ProductCard products={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 my-8">
              {product.map((item, index) => (
                <div key={index}>
                  <ProductDetailCard products={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[70vh]">
          <h2 className="text-rose-600 font-bold text-3xl">
            Product Not Found
          </h2>
          <p className="font-medium text-sm text-zinc-500">
            Please try searching for other products
          </p>
        </div>
      )}
    </main>
  );
};

export default SearchPage;
