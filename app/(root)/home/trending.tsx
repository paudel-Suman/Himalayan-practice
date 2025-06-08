import PageHeader from "@/components/text/page-header";
import React from "react";
import { ProductMock } from "@/data/product-mock";
import ProductCard from "@/components/card/product-card";

const Trending = () => {
  return (
    <div>
      <PageHeader title="Trending Products" />

      <div className="grid grid-cols-4 gap-6 my-6">
        {ProductMock.map((item, index) => (
          <div key={index}>
            <ProductCard products={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
