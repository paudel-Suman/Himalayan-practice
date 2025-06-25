import { API_ROUTES } from "@/constants/apiRoute";
import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/apiClient";
import { ProductResponse, SearchProductResponse } from "@/types/product";

import Cookies from "js-cookie";
export class productService {
  static async fetchAllProducts(page: number): Promise<ProductResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<ProductResponse>(
      `${API_ROUTES.SUPERADMIN_ADMIN.FETCH_ALL_PRODUCT}?page=${page}`,
      {
        method: "GET",
        token,
      }
    );
  }
  static async searchProduct(query: string): Promise<SearchProductResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    const url = `${API_ROUTES.SUPERADMIN_ADMIN.SEARCH_PRODUCT}?name=${query}`;
    return await apiClient<SearchProductResponse>(url, {
      method: "GET",
      token,
    });
  }
}
