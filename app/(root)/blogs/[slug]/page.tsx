import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import moment from "moment";
import { blogType } from "@/types/blogs";

async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/blog/fetch-blog-by-slug/${slug}`,
    {
      next: { revalidate: 20 }, // Revalidate every 20 seconds
    }
  );
  const response = await res.json();

  const post: blogType = response.blog;

  if (!post) {
    console.log(`No post found for ID: ${slug}`);
    notFound();
  }

  return post;
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/blog/fetch-all-blogs`,
    {
      cache: "force-cache",
    }
  ).then((res) => res.json());

  const posts: blogType[] = response.data.blogs;

  if (!Array.isArray(posts)) {
    console.error("Expected an array of posts, got:", posts);
    return [];
  }

  return posts.map((post) => ({
    slug: String(post.slug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title || "Blog Post",
  };
}

const ViewBlogs = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPost(slug);

  const { title, description, image, updatedAt } = post;

  return (
    <>
      <main className="relative my-10">
        <Link
          href="/blogs"
          className="lg:sticky  top-20 lg:ml-20 cursor-pointer gap-2 items-center flex w-fit px-4 hover:scale-110 ease-in-out duration-200 hover:text-blue-500"
        >
          <Icon
            icon="weui:back-filled"
            width="1.2em"
            height="1.2em"
            style={{ color: "#000000" }}
          />
          Back
        </Link>
        <section className="max-w-5xl mx-auto space-y-4 flex flex-col justify-center py-10 items-center">
          <h1 className=" text-5xl font-bold text-center w-full">{title}</h1>
          <div className="flex items-center justify-center text-sm">
            {moment(updatedAt).format("MMMM Do YYYY")}
          </div>

          <div className="md:max-h-[70vh] h-[50vh] w-full my-10">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="text-lighttext my-8 text-xl  space-y-4 ">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </section>
      </main>
    </>
  );
};

export default ViewBlogs;
