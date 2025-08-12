import { getSingleProduct } from "@/actions/fetchapi";
import React from "react";
import ProductDetailPage from "./product-detail";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const singleProduct = await getSingleProduct(slug);

  return (
    <main className="max-w-6xl md:mx-auto mx-4 my-20">
      <ProductDetailPage productdetails={singleProduct} />
    </main>
  );
};

export default ProductDetail;
