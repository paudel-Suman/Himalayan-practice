import { getBlogPosts } from "@/actions/fetchblogs";
import StripeCard from "@/components/ui/stripcard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: `Blog | NextGen Interiors & Architect.`,
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  description:
    "Blog - Nextgen help to design and build Hotels, Restaurant, Cafe, Commercial Building, Residence and other projects in Nepal.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}blogs`,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}og/blog.png`,
        width: 1200,
        height: 630,
        alt: "About Us",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | NextGen Interiors & Architect.`,
    description:
      "Blog - Nextgen help to design and build Hotels, Restaurant, Cafe, Commercial Building, Residence and other projects in Nepal.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}og/blog.png`],
  },
};

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <div className="my-20 ">
        {blogPosts.length > 0 ? (
          <StripeCard data={blogPosts} />
        ) : (
          <div className="h-[60vh] flex justify-center items-center">
            <h2 className="text-4xl font-bold text-red-500">No Blogs Found !</h2>
          </div>
        )}
      </div>
    </>
  );
}
