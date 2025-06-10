"use client";
import ChipTabs from "@/components/products/chiptabs";
import ProductImages from "@/components/products/product-images";
import { Button } from "@/components/ui/button";
import { producttype } from "@/types/product";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import React, { useState } from "react";

const ProductDetailPage = ({
  productdetails,
}: {
  productdetails: producttype;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { name, description, price, media, productAttributes, stock, id } =
    productdetails;

  // Handle quantity changes
  const availableStock = stock.quantity;

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      if (prev >= availableStock) {
        // toast.error(`Only ${availableStock} items available in stock`);
        return prev;
      }
      return prev + 1;
    });
  };

  return (
    <main>
      <section className="grid grid-cols-2 gap-8">
        <div className="border rounded-md border-zinc-200">
          <ProductImages media={media} />
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-2xl">{name}</h2>
          <p
            className="text-lighttext"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                icon="material-symbols-light:star-rounded"
                className=" fill-yellow-500 text-yellow-500 text-3xl "
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-primarymain font-semibold text-3xl">
              Rs. {price}
            </p>
            <del className="text-lighttext/50 font-medium text-xl">
              Rs. {price}
            </del>
          </div>

          <div>
            <p className="text-lg font-semibold"> Colors</p>
            <div className="flex gap-2">
              {productAttributes?.map((attribute) => (
                <div key={attribute.id}>
                  <div className="flex gap-3">
                    {attribute.colorIds.map((color) => {
                      const hexColor = color.productColor?.hex
                        ? /^#[0-9A-F]{6}$/i.test(color.productColor.hex)
                          ? color.productColor.hex
                          : `#${color.productColor.hex}`
                        : "#CCCCCC";

                      return (
                        <div
                          key={color.productColorId}
                          className={`w-8 h-8 cursor-pointer rounded-full `}
                          title={color.productColor?.name?.trim() || "Unknown"}
                          style={{ backgroundColor: hexColor }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex gap-2">
              {productAttributes.map((attribute) => (
                <div key={attribute.id}>
                  <div className="flex gap-3">
                    {attribute.sizeIds.map((size) => (
                      <div
                        key={size.productSizeId}
                        className={`flex items-center cursor-pointer justify-center h-10 w-10 rounded  bg-zinc-200 `}
                      >
                        {size.productSize.sizeNumber}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center w-fit border rounded-md">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-2 border-r cursor-pointer hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-2 border-l cursor-pointer hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button className="flex items-center cursor-pointer bg-primarymain text-white hover:bg-primarymain/90">
              <ShoppingBag className="h-4 w-4" />
              ADD TO CART
            </Button>

            <div className={`bg-rose-600 text-white rounded-full p-2 w-fit`}>
              <Heart className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      <ChipTabs description={description} productId={id} />
    </main>
  );
};

export default ProductDetailPage;
