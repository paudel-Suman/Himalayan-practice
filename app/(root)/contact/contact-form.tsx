import { getSocials } from "@/actions/fetchsocial";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactForm = async () => {
  const socials = await getSocials();

  return (
    <main className="max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-8 md:p-4 p-2 my-14">
      <div className="space-y-6 overflow-hidden">
        <h2 className=" font-bold text-4xl ">Get in Touch</h2>
        <p className="font-medium md:text-base text-sm text-lighttext">
          We are an independently owned and officially authorized full-service
          tour operator based in Kathmandu, Nepal.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex justify-start space-x-4">
            {socials.map((item) => (
              <div key={item.id}>
                <Link href={item.url}>
                  <Image
                    src={item.iconUrl}
                    alt={item.platform}
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6880.247193938896!2d85.31134507535812!3d27.71402517617878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190286e454ad%3A0xb002146d30bac2e5!2sHimalayan%20Java%20-%20Tridevi%20Thamel!5e1!3m2!1sen!2snp!4v1749985423270!5m2!1sen!2snp"
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

          <Button className="bg-primarymain">Submit</Button>
        </form>
      </div>
    </main>
  );
};

export default ContactForm;
