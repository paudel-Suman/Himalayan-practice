"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryType } from "@/types/category";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import S3UploadForm from "@/lib/s3upload-form";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { ProductColor, ProductSize } from "@/types/product";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductEditPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const token = Cookies.get("token");
  const [tags, setTags] = useState<string[]>([]);
  const [productID, setproductID] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [selectedSizeIds, setSelectedSizeIds] = useState<string[]>([]);
  const [categories, setCategories] = React.useState<categoryType[]>([]);
  const [color, setColor] = React.useState<ProductColor[]>([]);
  const [size, setSize] = React.useState<ProductSize[]>([]);
  const [image, setImage] = useState("");
  const [multipleimage, setMultipleImage] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    featureImage: "",
    categoryId: "",
    price: 0,
    stock: "",
    isActive: true,
    isDeleted: false,
    isFeatured: false,
    media: [],
    productAttributes: [],
    tags: [],
  });

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const newSlug = slugify(formData.name);
    setFormData((prev) => ({
      ...prev,
      slug: newSlug,
    }));
  }, [formData.name]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorToggle = (id: string) => {
    setSelectedColorIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSizeToggle = (id: string) => {
    setSelectedSizeIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleUploadFeatureImage = (urls: string[]) => {
    setImage(urls[0]);
  };
  const handleUploadMultipleImage = (urls: string[]) => {
    setMultipleImage(urls[0]);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/category/fetch-all-categories`
        );

        const data = await res.json();
        setCategories(data.categories);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching product reviews:", error);
        toast.error("Failed to load reviews");
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/product-color/fetch-product-color`
        );

        const data = await res.json();
        setColor(data.colors);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch Color");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load COlor");
      }
    };
    fetchColor();
  }, []);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/product-size/fetch-product-size`
        );

        const data = await res.json();
        setSize(data.sizes);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch Color");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load COlor");
      }
    };
    fetchColor();
  }, []);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/product/fetch-product-by-slug/${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        const product = data.data;
        setproductID(product.id);

        // Pre-fill tag names
        const fetchedTags = product.tags?.map((tag: any) => tag.name) || [];

        // Pre-fill size and color IDs
        const fetchedAttributes = product.productAttributes?.[0] || {};
        const fetchedSizeIds = fetchedAttributes.sizeIds?.map(String) || [];
        const fetchedColorIds = fetchedAttributes.colorIds?.map(String) || [];

        setFormData({
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          price: product.price || 0,
          stock: product.stock?.quantity?.toString() || "",
          categoryId: product.categoryId || "",
          featureImage:
            (product.featureImage && setFeatureImage(product.featureImage)) ||
            "",
          isActive: product.isActive || false,
          isDeleted: product.isDeleted || false,
          isFeatured: product.isFeatured || false,
          media: product.media || [],
          tags: product.tags || [],
          productAttributes: product.productAttributes || [],
        });

        setTags(fetchedTags);
        setStockQuantity(product.stock?.quantity || 0);
        setSelectedColorIds(fetchedColorIds);
        setSelectedSizeIds(fetchedSizeIds);
        setImage(product.featureImage || "");
        if (product.media?.[0]?.url) {
          setMultipleImage(product.media[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product");
      }
    };

    fetchSingleProduct();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      categoryId: formData.categoryId,
      isActive: formData.isActive,
      price: Number(formData.price),
      featureImage: image,
      isFeatured: formData.isFeatured,
      stock: {
        quantity: stockQuantity,
      },
      media: [
        {
          url: multipleimage,
          type: "IMAGE",
        },
      ],
      tags: tags.map((tag) => ({ name: tag })),
      productAttributes: [
        {
          sizeIds: selectedSizeIds,
          colorIds: selectedColorIds,
        },
      ],
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/update-product/${productID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }
      toast.success("Product Updated Successfully");
      // router.push("/dashboard/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="my-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/products">Product</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-green-500">Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-xl font-bold mt-10">Edit Product</h2>
      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Stylish Fashion Bag"
              className="bg-white shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input name="slug" value={formData.slug} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="500"
            />
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => {
                const selected = categories.find((cat) => cat.id === value);
                setFormData((prev) => ({
                  ...prev,
                  categoryId: value,
                  category: selected?.name || "",
                }));
              }}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent className="w-full flex flex-col">
                {categories.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.id}
                    className="text-black"
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Stock Quantity</Label>
            <Input
              type="number"
              placeholder="20"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 ">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <Input
                type="text"
                onKeyDown={handleTagInput}
                placeholder="Add a tag"
              />
            </div>
          </div>
        </section>
        <section className="flex flex-wrap items-center md:gap-20 gap-8">
          <div className="space-y-2">
            <Label>Select Color</Label>
            <div className="flex gap-4">
              {color.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={String(item.id)}
                    value={String(item.id)}
                    checked={selectedColorIds.includes(String(item.id))}
                    onChange={() => handleColorToggle(String(item.id))}
                  />
                  <label htmlFor={String(item.id)}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Select Sizes</Label>
            <div className="flex gap-4">
              {size.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center gap-2">
                  <input
                    type="checkbox"
                    id={`size-${item.id}`}
                    value={item.id}
                    checked={selectedSizeIds.includes(String(item.id))}
                    onChange={() => handleSizeToggle(String(item.id))}
                  />
                  <label htmlFor={`size-${item.id}`}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Is Active</Label>
            <div className="flex  gap-4">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="isActive"
                  value="true"
                  className="h-4 w-4"
                  checked={formData.isActive === true}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: true,
                    }))
                  }
                />
                <span>True</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="isActive"
                  value="false"
                  checked={formData.isActive === false}
                  className="h-4 w-4"
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: false,
                    }))
                  }
                />
                <span>False</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Is Featured</Label>
            <div className="flex  gap-4">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="isFeatured"
                  value="true"
                  className="h-4 w-4"
                  checked={formData.isFeatured === true}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: true,
                    }))
                  }
                />
                <span>True</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="isFeatured"
                  value="false"
                  checked={formData.isFeatured === false}
                  className="h-4 w-4"
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: false,
                    }))
                  }
                />
                <span>False</span>
              </label>
            </div>
          </div>
        </section>
        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-white rounded-md p-2 border"
            placeholder="Description of the product"
            rows={8}
          ></textarea>
        </div>{" "}
        <div className="space-y-2">
          <Label>Feature Image</Label>
          <S3UploadForm
            id={"feature-image"}
            multiple={false}
            onUploadComplete={handleUploadFeatureImage}
          />
        </div>
        <figure>
          {featureImage && (
            <Image
              src={featureImage}
              alt="feature-image"
              width={500}
              height={500}
              className="h-[20em] w-full object-contain"
            />
          )}
        </figure>
        <div className="space-y-2">
          <Label>Multiple Media</Label>
          <S3UploadForm
            id={"media-image"}
            multiple={true}
            onUploadComplete={handleUploadMultipleImage}
          />
        </div>
        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default ProductEditPage;
