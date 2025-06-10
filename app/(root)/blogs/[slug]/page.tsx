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
          <div className="text-end w-full py-2 my-5 border-b border-zinc-600 text-zinc-400 flex justify-between font-gt-walsheim text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 border-zinc-400 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="John Doe"
                  height={100}
                  width={100}
                  priority={true}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <p className="text-sm">John Doe</p>
            </div>
            <div className="flex items-center text-sm">
              {moment(updatedAt).format("MMMM Do YYYY")}
            </div>
          </div>

          <div className="md:max-h-[70vh] h-[50vh] w-full">
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
