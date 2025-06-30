import { TestimonialType } from "@/types/testimonial";

export async function getTestimonials(): Promise<TestimonialType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/testimonial/fetch-all-testimonial`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Category");
    }

    const data = await res.json();
    return data.testimonials || [];
  } catch (error) {
    console.error("Error fetching Testimonials:", error);
    return [];
  }
}
