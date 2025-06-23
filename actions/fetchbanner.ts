import { bannerType } from "@/types/banner";

export async function getBanner(): Promise<bannerType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/banner/fetch-all-banner`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Category");
    }

    const data = await res.json();
    return data.banners.banners || [];
  } catch (error) {
    console.error("Error fetching Category:", error);
    return [];
  }
}
