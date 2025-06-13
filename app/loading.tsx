import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-white">
      <Image
        src="/logo/mainlogo.png"
        alt="Himalaya Garment Logo"
        className="object-contain object-left animate-pulse"
        height={200}
        width={200}
        priority
      />
    </div>
  );
};

export default Loading;
