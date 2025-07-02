import { getCompanyInfo } from "@/actions/fetchcompanydata";
import { getSocials } from "@/actions/fetchsocial";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactForm from "./contact-form";

const ContactDetails = async () => {
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

        <ContactForm />
      </div>
    </main>
  );
};

export default ContactDetails;
