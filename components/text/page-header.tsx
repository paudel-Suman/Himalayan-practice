import React from "react";
import { cn } from "@/lib/utils";

type titleprops = {
  title: string;
  className?: string;
};

const PageHeader = ({ title, className }: titleprops) => {
  return <h2 className={cn(className, "font-semibold text-2xl")}>{title}</h2>;
};

export default PageHeader;
