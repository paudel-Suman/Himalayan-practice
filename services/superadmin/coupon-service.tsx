import { API_ROUTES } from "@/constants/apiRoute";
import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/common";
import { Coupon, CouponResponse } from "@/types/coupon";
import Cookies from "js-cookie";
export class couponService {
  static async fetchAllCoupons(pageNumber: number): Promise<CouponResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Token not found");
    }
    return await apiClient<CouponResponse>(
      `${API_ROUTES.COUPON.FETCH_ALL_COUPON}page=${pageNumber}`,
      {
        method: "GET",
        token,
      }
    );
  }

  static async addCoupon(payload: Coupon): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(API_ROUTES.COUPON.ADD_COUPON, {
      method: "POST",
      body: payload,
      token,
    });
  }
  static async updateCoupon(payload: Coupon): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(
      `${API_ROUTES.COUPON.UPDATE_COUPON}${payload.id}`,
      {
        method: "PUT",
        body: payload,
        token,
      }
    );
  }

  static async deleteCoupon(couponId: string): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(
      `${API_ROUTES.COUPON.DELETE_COUPON}${couponId}`,
      {
        method: "DELETE",
        token,
      }
    );
  }
}
