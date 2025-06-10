import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const ContactForm = () => {
  return (
    <main className="max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-8 md:p-4 p-2 my-14">
      <div className="space-y-6 overflow-hidden">
        <h2 className=" font-bold text-4xl ">Get in Touch</h2>
        <p className="font-medium md:text-base text-sm text-lighttext">
          We are an independently owned and officially authorized full-service
          tour operator based in Kathmandu, Nepal.
        </p>
        <div className="flex items-center gap-4">
          {social.map((item, index) => (
            <div key={index}>
              <Link
                href={item.path}
                className="font-medium text-sm  hover:ml-2 ease-in-out duration-300 hover:text-primary-600"
              >
                {item.icon}
              </Link>
            </div>
          ))}
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28237.4372563045!2d85.26903907431641!3d27.78884310000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1f001dcf200f%3A0xca48ca5d9313fbe4!2sMystic%20Nepal%20Adventure%20(p.).Ltd!5e0!3m2!1sen!2snp!4v1741168743483!5m2!1sen!2snp"
          loading="lazy"
          height="full"
          className="w-full h-full mx-auto rounded-lg shadow-md"
        ></iframe>
      </div>
      <div className="space-y-6 bg-zinc-50 rounded-lg md:p-6 p-2">
        <h2 className="font-bold text-3xl">Fill up the form</h2>
        <p className="font-medium md:text-base text-sm text-lighttext">
          Your email address will not be published.Required fields are marked
        </p>

        <form action="" className="!mt-10 space-y-4">
          <div className="flex w-full gap-4 items-center">
            <div className="flex flex-col gap-2 w-full">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Email Address</Label>

              <Input placeholder="Enter email address" />
            </div>
          </div>
          <div className="flex w-full gap-4 items-center">
            <div className="flex flex-col gap-2 w-full">
              <Label>Contact Number</Label>
              <Input placeholder="+977-9800000000" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Subject</Label>
              <Input placeholder="Subject matter" />
            </div>
          </div>

          <div>
            <Label>Message</Label>
            <textarea
              rows={10}
              className="p-4 rounded-lg border-primary-600/50 outline-none text-sm  border w-full"
            />
          </div>

          <Button>Submit</Button>
        </form>
      </div>
    </main>
  );
};

export default ContactForm;
const social = [
  {
    icon: <Icon icon="logos:facebook" width="30" height="30" />,
    path: "/",
  },
  {
    icon: <Icon icon="skill-icons:instagram" width="30" height="30" />,
    path: "/",
  },
  {
    icon: <Icon icon="logos:whatsapp-icon" width="30" height="30" />,
    path: "/",
  },
];
