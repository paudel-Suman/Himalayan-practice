import { wishlistType } from "@/types/wishlist";

export async function getWishlist(token: string): Promise<wishlistType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/wishlist/fetch-all-wishlist`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const data = await res.json();
    return data.data.wishlists || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
