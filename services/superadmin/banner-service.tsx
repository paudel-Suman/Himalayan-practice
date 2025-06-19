import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/common";
import Cookies from "js-cookie";
import { API_ROUTES } from "@/constants/apiRoute";
import { BannerResponse, bannerType } from "@/types/banner";
export class bannerService {
  static async fetchAllBanners(pageNumber: number): Promise<BannerResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Token not found");
    }
    return await apiClient<BannerResponse>(
      `${API_ROUTES.BANNER.FETCH_ALL_BANNER}page${pageNumber}`,
      {
        method: "GET",
        token,
      }
    );
  }

  static async addBanner(payload: bannerType): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(API_ROUTES.BANNER.ADD_BANNER, {
      method: "POST",
      body: payload,
      token,
    });
  }
  static async updateBanner(payload: bannerType): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(
      `${API_ROUTES.BANNER.UPDATE_BANNER}${payload.id}`,
      {
        method: "PUT",
        body: payload,
        token,
      }
    );
  }

  static async deleteCoupon(bannerId: string): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(
      `${API_ROUTES.BANNER.DELETE_BANNER}${bannerId}`,
      {
        method: "DELETE",
        token,
      }
    );
  }
}
