import { faqType } from "@/types/faq";

export async function getFaq(): Promise<faqType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/faq/fetch-all-faq`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Faq");
    }

    const data = await res.json();
    return data.faqs || [];
  } catch (error) {
    console.error("Error fetching Faq:", error);
    return [];
  }
}
