import { producttype } from "./product";

export type Order = {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddressId: string;
  billingAddressId: string;
  placedAt: string;
  deliveryDate: string;
  notes: string;
  isPaid: boolean;
  isCancelled: boolean;
  shippingMethod: string;
  items: Item[];
  shippingAddress: Address;
  billingAddress: Address;
  payment: Payment;
};

export type Item = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  product: producttype;
};

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  userId: string;
};

export type Payment = {
  id: string;
  method: string;
  status: string;
  amount: number;
  orderId: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
};

export interface OrderResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: OrderWithMeta;
}

export type OrderWithMeta = {
  pagination: Meta;
  orders: Order[];
};
export type Meta = {
  currentPage: number;
  totalPages: number;
  limit: number;
};

export interface SearchOrderResponse {
  success: boolean;
  statusCode: string;
  message: string;
  orders: Order[];
}
