import { API_ROUTES } from "@/constants/apiRoute";
import { apiClient } from "@/lib/apiClient";
import { CustomerDataResponse } from "@/types/auth";
// import { cookies } from 'next/headers';
import Cookies from "js-cookie";
export class customerService {
  static async fetchAllCustomer(): Promise<CustomerDataResponse> {
    // const cookieStore = await cookies();
    const token = Cookies.get("token");
    // const token = cookieStore.get('token')?.value;

    if (!token) {
      throw new Error("Token not found");
    }
    return await apiClient<CustomerDataResponse>(
      API_ROUTES.SUPERADMIN_DASHBOARD.FETCH_ALL_CUSTOMER,
      {
        method: "GET",
        token,
      }
    );
  }

  static async searchCustomer(
    searchQuery: string
  ): Promise<CustomerDataResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const url = `${
      API_ROUTES.SUPERADMIN_DASHBOARD.SEARCH_CUSTOMER
    }?name=${encodeURIComponent(searchQuery)}`;
    return await apiClient<CustomerDataResponse>(url, {
      method: "GET",
      token,
    });
  }
}
