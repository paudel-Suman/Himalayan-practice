import { producttype } from "@/types/product";

export async function getTrendingProducts(): Promise<producttype[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/product/fetch-all-products`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch trending products");
    }

    const data = await res.json();
    return data.data.product || [];
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return [];
  }
}
