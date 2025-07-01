import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { getCompanyInfo } from "../../../actions/fetchcompanydata";

const ContactInfo = async () => {
  const company = await getCompanyInfo();
  const contactdata = [
    {
      title: "Address Line",
      desc: company.address,
      icon: <Icon icon="mdi:address-marker-outline" />,
    },
    {
      title: "Contact Number",
      desc: company.phoneNumber,
      icon: <Icon icon="fluent:call-24-regular" />,
    },
    {
      title: "Mailing Address",
      desc: company.contactEmail,
      icon: <Icon icon="famicons:mail-outline" />,
    },
  ];
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto md:my-20 my-10">
      {contactdata.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-6 border rounded-md bg-zinc-50 border-primary-600 border-dashed"
        >
          <span className="lg:text-[3.5vw] text-2xl text-primary-600">
            {item.icon}
          </span>
          <div className="text-center mt-4">
            <h1 className="font-semibold text-xl tracking-wider font-palker mb-2 ">
              {item.title}
            </h1>
            <p className="font-medium text-sm text-lighttext">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
