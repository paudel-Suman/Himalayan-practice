import { categoryType } from "@/types/category";
import { producttype } from "@/types/product";
import { reviewType } from "@/types/review";

export async function getTrendingProducts(): Promise<producttype[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/product/fetch-all-active-products`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch trending products");
    }

    const data = await res.json();
    return data.data.products || [];
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return [];
  }
}
export async function getCategory(): Promise<categoryType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/category/fetch-all-categories`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Category");
    }

    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching Category:", error);
    return [];
  }
}

export async function getSingleProduct(slug: string): Promise<producttype> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/product/fetch-product-by-slug/${slug}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch single product");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function getProductReview(productId: string): Promise<reviewType> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/review/fetch-review-by-productId/${productId}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch the reviews");
    }

    const data = await res.json();
    return data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}
