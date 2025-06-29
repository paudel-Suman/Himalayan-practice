import { TestimonialType } from "@/types/testimonial";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialType }) => {
  const { avatar, designation, message, name } = testimonial;
  return (
    <div className="p-4 rounded-md shadow-sm border bg-white">
      <div className="">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={avatar}
              width={1000}
              height={1000}
              alt="testimonials"
              className="rounded-full h-14 w-14 border border-green-500 object-cover"
            />

            <div>
              <h2 className="font-semibold md:text-base text-sm">{name}</h2>
              <h2 className="md:text-sm text-xs">{designation}</h2>
            </div>
          </div>
          <Icon icon="flat-color-icons:google" width="30" height="30" />
        </div>
      </div>
      <p className="my-4 sm:text-sm text-xs text-zinc-700">{message}</p>
    </div>
  );
};

export default TestimonialCard;
