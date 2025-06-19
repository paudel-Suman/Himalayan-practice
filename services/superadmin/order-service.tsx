import { API_ROUTES } from "@/constants/apiRoute";
import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/apiClient";
import { OrderResponse, SearchOrderResponse } from "@/types/order";

import Cookies from "js-cookie";
export class orderService {
  static async fetchAllOrders(): Promise<OrderResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<OrderResponse>(
      API_ROUTES.SUPERADMIN_ADMIN.FETCH_ALL_ORDERS,
      {
        method: "GET",
        token,
      }
    );
  }
  static async searchOrder(query: string): Promise<SearchOrderResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    const url = `${API_ROUTES.SUPERADMIN_ADMIN.SEARCH_ORDER}?orderId=${query}`;
    return await apiClient<SearchOrderResponse>(url, {
      method: "GET",
      token,
    });
  }
}
