import { getBlogPosts } from "@/actions/fetchblogs";
import PageHeader from "@/components/text/page-header";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingBlogs = async () => {
  const blogPosts = await getBlogPosts();

  return (
    <main>
      <PageHeader title="Recent Blog Posts" />

      <section className="grid grid-cols-2 gap-6 my-8">
        <div>
          {blogPosts.slice(0, 1).map((item, index) => (
            <Link href={`/blogs/${item.slug}`} key={index}>
              <figure className="overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="object-cover w-full hover:scale-110 ease-in-out duration-300 h-[15em]"
                />
              </figure>
              <div className="space-y-2 my-4">
                <div className="flex items-center text-sm text-blue-500">
                  {moment(item.updatedAt).format("MMMM Do YYYY")}
                </div>
                <h2 className="line-clamp-2 text-xl font-semibold">
                  {item.title}
                </h2>
                <p
                  className="text-lighttext text-sm"
                  dangerouslySetInnerHTML={{
                    __html: item.description.slice(0, 250),
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          {blogPosts.slice(1, 3).map((item, index) => (
            <Link
              href={`/blogs/${item.slug}`}
              key={index}
              className="grid grid-cols-2 gap-4"
            >
              <figure className="overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="object-cover rounded-md w-full hover:scale-110 ease-in-out duration-300 h-full"
                />
              </figure>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-blue-500">
                  {moment(item.updatedAt).format("MMMM Do YYYY")}
                </div>
                <h2 className="line-clamp-2 text-xl font-semibold">
                  {item.title}
                </h2>
                <p
                  className="text-lighttext text-sm"
                  dangerouslySetInnerHTML={{
                    __html: item.description.slice(0, 150),
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TrendingBlogs;
