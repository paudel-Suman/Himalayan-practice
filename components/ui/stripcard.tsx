import { blogType } from "@/types/blogs";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function StripeCard({ data }: { data: blogType[] }) {
  return (
    <>
      <main className="space-y-10 max-w-7xl mx-auto">
        <div className=" flex flex-col justify-center">
          <h1 className="font-bold  text-4xl text-center">
            Top <span className="">Blogs</span>
          </h1>
          <h1 className="text-lighttext text-md md:w-[50%] mx-auto text-center mt-4">
            Learn about the importance of designing products and services that
            cater to the diverse needs and abilities of all age groups,
            promoting inclusivity and accessibility.
          </h1>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6  mx-auto">
          {data.slice(0, 6).map((items) => {
            return (
              <Link href={`/blogs/${items.slug}`} key={items.id}>
                <div className="  group mx-auto  p-2  overflow-hidden  ">
                  <figure className="w-full lg:h-[40vh] h-60  transition-all duration-300 group-hover:h-72  relative overflow-hidden">
                    <div
                      style={{
                        background:
                          "linear-gradient(123.9deg, #0B65ED 1.52%, rgba(0, 0, 0, 0) 68.91%)",
                      }}
                      className="absolute top-0 left-0 w-full h-full  group-hover:opacity-100 opacity-0  transition-all duration-300"
                    ></div>
                    <Image
                      src={items.image}
                      alt={items.title}
                      width={600}
                      height={600}
                      className="absolute bottom-0  right-0 h-full w-full   object-cover transition-all duration-300"
                      priority={true}
                    />
                  </figure>
                  <article className="py-2 space-y-2">
                    <h1 className="font-semibold text-lg line-clamp-2">
                      {items.title}
                    </h1>
                    <p
                      className="text-base  text-zinc-400 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: items.description }}
                    />
                    <div
                      className=" text-base text-blue-300 font-normal items-center
                  group-hover:opacity-100 opacity-0 translate-y-2
                  group-hover:translate-y-0 pt-2 flex gap-1 transition-all
                  duration-300 "
                    >
                      Learn more
                      <span>
                        <ChevronRight />
                      </span>
                    </div>
                  </article>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default StripeCard;
