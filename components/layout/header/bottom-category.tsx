import React from "react";
import { Icon } from "@iconify/react";

const BottomCategory = () => {
  return (
    <div className="bg-primary p-2 text-white">
      <div className="max-w-7xl mx-auto flex justify-between gap-6">
        <div className="flex gap-6">
          <h2>Womens </h2>
          <h2>Mens </h2>
          <h2>Bags</h2>
        </div>
        <div className="flex gap-6">
          <Icon icon="mdi:cart" width="24" height="24" />
          <Icon icon="ri:heart-fill" width="24" height="24" />
          <Icon
            icon="iconamoon:profile-circle-fill"
            width="24"
            height="24"
          />
        </div>
      </div>
    </div>
  );
};

export default BottomCategory;
