"use client";
import { getCompanyInfo } from "@/actions/fetchcompanydata";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const TopInfo = () => {
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const comp = await getCompanyInfo();
        console.log(comp);
        setCompany(comp);
      } catch (error) {
        console.error("Failed to fetch Company:", error);
      }
    };

    fetchCompany();
  }, []);
  return (
    <div className="bg-primarymain p-2 text-white">
      <div className="max-w-7xl xl:mx-auto mx-4 flex justify-between">
        <div className="flex md:text-base text-sm items-center gap-1">
          <Icon icon="ion:mail" width="16" height="16" />

          {company && (
            <a href={`mailto:${company.contactEmail}`}>
              {company.contactEmail}
            </a>
          )}
        </div>

        <div
          className="md:text-base text-sm whitespace-nowrap 
        flex items-center gap-1"
        >
          <Icon icon="famicons:call" width="16" height="16" />

          {company && (
            <a href={`tel:${company.phoneNumber}`}>{company.phoneNumber}</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
