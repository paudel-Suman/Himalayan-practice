"use client";
import ChipTabs from "@/components/products/chiptabs";
import ProductImages from "@/components/products/product-images";
import { Button } from "@/components/ui/button";
import { producttype } from "@/types/product";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Heart, Loader, Minus, Plus, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMyContext } from "../../context/store";
import { redirect, usePathname } from "next/navigation";

const ProductDetailPage = ({
  productdetails,
}: {
  productdetails: producttype;
}) => {
  const { store, setStore } = useMyContext();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const firstAttribute = productdetails.productAttributes[0];
  const firstColor = firstAttribute?.colorIds[0]?.productColor;
  const firstSize = firstAttribute?.sizeIds[0];
  const [selectedColor, setSelectedColor] = useState(
    firstColor?.name?.toLowerCase()?.trim() || "unknown"
  );
  console.log(selectedColor);
  const [selectedSize, setSelectedSize] = useState(
    firstSize?.productSizeId || null
  );
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedColorName, setSelectedColorName] = useState(
    firstColor?.name?.trim() || "Unknown"
  );
  const [quantity, setQuantity] = useState(1);
  const { name, description, price, media, productAttributes, stock, id } =
    productdetails;
  const availableStock = stock.quantity;
  console.log(availableStock);

  // Ensure a color is selected by default on mount
  useEffect(() => {
    if (
      firstAttribute?.colorIds?.length &&
      (!selectedColorId || !selectedColorName)
    ) {
      const firstColorObj = firstAttribute.colorIds[0];

      setSelectedColor(
        firstColorObj.productColor?.name?.toLowerCase()?.trim() || "unknown"
      );
      setSelectedColorId(firstColorObj.productColorId || null); // ✅ Use the correct key here
      setSelectedColorName(
        firstColorObj.productColor?.name?.trim() || "Unknown"
      );
    }
  }, [firstAttribute, selectedColorId, selectedColorName]);

  // Handle color change
  const handleColorChange = (
    color: string,
    colorId: string,
    colorName: string
  ) => {
    setSelectedColor(color);
    setSelectedColorId(colorId);
    setSelectedColorName(colorName);
  };

  // Handle size change
  const handleSizeChange = (sizeId: string) => {
    const sizeData = productdetails.productAttributes
      .flatMap((attr) => attr.sizeIds)
      .find((size) => size.productSizeId === sizeId);
    if (sizeData?.productSize) {
      setSelectedSize(sizeId);
    }
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      if (prev >= availableStock) {
        toast.error(`Only ${availableStock} items available in stock`);
        return prev;
      }
      return prev + 1;
    });
  };

  const addToCart = async (item: producttype, quantity = 1) => {
    const apiPayload = {
      sizeId: selectedSize,
      colorId: selectedColorId,
      quantity: quantity,
      productId: item.id,
      total: item.price,
    };

    if (!store.auth.token) {
      toast.error("Please login to add to Cart.");
      redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/cart/add-to-cart/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
          body: JSON.stringify(apiPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart");
      }

      const updatedCartRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/cart/fetch-user-cart`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
        }
      );

      const cartData = await updatedCartRes.json();
      const updatedCart = cartData?.cart?.items || [];

      setStore((prev: any) => ({
        ...prev,
        cart: updatedCart,
      }));

      localStorage.setItem("katunje-cart", JSON.stringify(updatedCart));

      toast.success("Item added to cart successfully!");
    } catch (error: unknown) {
      console.error("Error adding to cart:", error);
      let errorMessage = "Failed to add item to cart";
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="grid md:grid-cols-2 gap-8">
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

          {/* product colors */}
          <div>
            <p className="font-medium mb-2"> Colors</p>
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
                          onClick={() =>
                            handleColorChange(
                              color.productColor?.name?.toLowerCase()?.trim() ||
                                "unknown",
                              color.productColorId,
                              color.productColor?.name?.trim() || "Unknown"
                            )
                          }
                          key={color.productColorId}
                          className={`w-8 h-8 cursor-pointer rounded-full ${
                            selectedColorId === color.productColorId
                              ? "ring-2 ring-black ring-offset-2 ring-offset-white"
                              : "hover:opacity-80"
                          }`}
                          title={color.productColor?.name?.trim() || "Unknown"}
                          style={{ backgroundColor: hexColor }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Selected Color: {selectedColorName || "None"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* product size */}
          <div>
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex gap-2">
              {productAttributes.map((attribute) => (
                <div key={attribute.id}>
                  <div className="flex gap-3">
                    {attribute.sizeIds.map((size) => (
                      <div
                        onClick={() => handleSizeChange(size.productSizeId)}
                        key={size.productSizeId}
                        className={`flex items-center cursor-pointer justify-center h-10 w-10 rounded border ${
                          selectedSize === size.productSizeId
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size.productSize.sizeNumber}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {availableStock > 0 && (
            <section className="space-y-6">
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
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(productdetails, quantity);
                  }}
                  className="flex items-center cursor-pointer bg-primarymain text-white hover:bg-primarymain/90"
                >
                  {loading ? (
                    <Loader className="animate-spin h-4 w-4" />
                  ) : (
                    <ShoppingBag className="h-4 w-4" />
                  )}
                  {loading ? "ADDING" : " ADD TO CART"}
                </Button>

                <div
                  className={`bg-rose-600 text-white rounded-full p-2 w-fit`}
                >
                  <Heart className="h-4 w-4" />
                </div>
              </div>
            </section>
          )}

          {availableStock < 0 && (
            <p className="text-red-500 font-semibold my-8">Out of Stock !</p>
          )}
        </div>
      </section>

      {/* review and description componenet */}
      <ChipTabs description={description} productId={id} />
    </main>
  );
};

export default ProductDetailPage;
