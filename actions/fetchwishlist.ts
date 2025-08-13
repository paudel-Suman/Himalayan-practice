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
      throw new Error("Failed to fetch wishlist");
    }

    const data = await res.json();

    const activeWishlists = (data.data.wishlists || []).filter(
      (wishlist: wishlistType) => wishlist.isActive === true
    );

    return activeWishlists;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
}
