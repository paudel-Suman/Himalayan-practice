export type producttype = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  featureImage: string;
  media: MediaType[];
  size: ProductSize[];
  color: ProductColor[];
  productAttributes: ProductAttribute[];
  stock: StockType;
};

export type ProductAttribute = {
  id: string;
  productId: string;
  sizeIds: {
    productAttributeId: string;
    productSizeId: string;
    productSize: ProductSize;
  }[];
  colorIds: {
    productAttributeId: string;
    productColorId: string;
    productColor: ProductColor;
  }[];
};

export type StockType = {
  id: string;
  quantity: number;
  productId: string;
};

export type MediaType = {
  id: string;
  productId: string;
  mediaType: string;
  mediaUrl: string;
};

export type ProductSize = {
  id: number;
  name: string;
  sizeNumber: number;
};

export type ProductColor = {
  productColorId: string;
  id: number;
  name: string;
  hex: string;
};

export type categoryType = {
  id: string;
  name: string;
};
