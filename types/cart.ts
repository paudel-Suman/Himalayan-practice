export type Cart = {
  id: string;
  name: string;
  cartId: string;
  quantity: number;
  colorId: string;
  sizeId: string;
  total: number;
  regionId: string;
  selectedColorId: string;
  selectedSizeId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    featureImage: string | null;
    price: number;
    isActive: boolean;
    isDeleted: boolean;
    userId: string;
    categoryId: string;
    subcategoryId: string | null;
    rating: number;
    createdAt: string;
    updatedAt: string;
    isFeatured: boolean;
    stock: {
      id: string;
      quantity: number;
      productId: string;
      updatedAt: string;
    };
    availableRegions: {
      code: string;
      name: string;
      currency: string;
      symbol: string;
      flag: string; // base64 string
    }[];
  };
  size: {
    id: string;
    sizeNumber: number;
    name: string;
  };
  color: {
    id: string;
    name: string;
    hex: string;
  };
};
