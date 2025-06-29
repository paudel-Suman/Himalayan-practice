import { SocialType } from "@/types/social";

export async function getSocials(): Promise<SocialType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/fetch-all-social-media`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Category");
    }

    const data = await res.json();
    const socials: SocialType[] = data.setting || [];
    socials.sort((a, b) => a.order - b.order);

    return socials;
  } catch (error) {
    console.error("Error fetching Testimonials:", error);
    return [];
  }
}
