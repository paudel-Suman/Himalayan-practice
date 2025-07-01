import { getCompanyInfo } from "@/actions/fetchcompanydata";
import { getSocials } from "@/actions/fetchsocial";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactForm = async () => {
  const socials = await getSocials();
  const company = await getCompanyInfo();

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
                <Link href={item.url} target="_blank">
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

        <div dangerouslySetInnerHTML={{ __html: company.googleMap }} />
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
