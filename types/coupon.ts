export type Coupon = {
  id?: string;
  code: string;
  expiryDate: string;
  couponCount: number;
  discountAmount?: number;
  discountPercent?: number;
  type: string;
  regionId?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export interface CouponResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: CouponResponseWithMeta;
}
export type CouponResponseWithMeta = {
  coupons: Coupon[];
  pagination: Meta;
};

export type Meta = {
  currentPage: number;
  totalPages: number;
  limit: number;
};
