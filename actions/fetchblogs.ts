import { blogType } from "@/types/blogs";

export async function getBlogPosts(): Promise<blogType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/blog/fetch-all-blogs`,
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const data = await res.json();
    return data.data.blogs || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
