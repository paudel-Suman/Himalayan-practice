import { producttype } from "./product";

export type wishlistType = {
  id: string;
  productId: string;
  isActive: boolean;
  product: producttype;
};
