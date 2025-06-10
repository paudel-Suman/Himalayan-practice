"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading";
import { useSearchParams } from "next/navigation";
import SearchPage from "./search-page";
export const dynamic = "force-dynamic";

const SearchLayout = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const sortBy = searchParams.get("sortBy") || "price_low_to_high";
  const categoryId = searchParams.get("categoryId") || "";
  const [product, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);

        let url = `${process.env.NEXT_PUBLIC_SERVER_API}/product/search-product`;
        const params = new URLSearchParams();

        if (query) params.append("query", query);
        if (sortBy) params.append("sortBy", sortBy);
        if (categoryId) params.append("categoryId", categoryId);

        if ([...params].length > 0) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product list: ${response.status}`);
        }

        const res = await response.json();
        const product = res?.products || [];

        setProducts(product);
      } catch (error) {
        console.error("Error fetching product list:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [query, sortBy, categoryId]);

  if (isLoading) return <Loading />;

  return (
    <main className="max-w-7xl lg:mx-auto mx-2 my-8 min-h-screen">
      <SearchPage product={product} sortBy={sortBy} categoryId={categoryId} />
    </main>
  );
};

export default SearchLayout;
