import { API_ROUTES } from "@/constants/apiRoute";
import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/apiClient";
import {
  AddCategoryResponse,
  addSubcategory,
  CategoryResponse,
  categoryType,
  SingleSubcategoryResponse,
  SubcategoryResponse,
} from "@/types/category";

import { ApiResponse } from "@/types/common";
import Cookies from "js-cookie";
export class categoryService {
  static async fetchAllCategories(): Promise<CategoryResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<CategoryResponse>(
      API_ROUTES.CATEGORY.FETCH_ALL_CATEGORY,
      {
        method: "GET",
        token,
      }
    );
  }
  static async addCategory(
    payload: categoryType
  ): Promise<AddCategoryResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<AddCategoryResponse>(
      API_ROUTES.SUPERADMIN_DASHBOARD.ADD_CATEGORY,
      {
        method: "POST",
        body: payload,
        token,
      }
    );
  }
  static async fetchAllSubategories(): Promise<SubcategoryResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<SubcategoryResponse>(
      API_ROUTES.CATEGORY.FETCH_ALL_SUBCATEGORY,
      {
        method: "GET",
        token,
      }
    );
  }

  static async updateCategory(
    payload: categoryType
  ): Promise<AddCategoryResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    const response: AddCategoryResponse = await apiClient<AddCategoryResponse>(
      API_ROUTES.SUPERADMIN_DASHBOARD.UPDATE_CATEGORY,
      {
        method: "PUT",
        body: payload,
        token,
      }
    );
    return response;
  }

  static async deleteCategory(categoryId: string): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    const response: AddCategoryResponse = await apiClient<AddCategoryResponse>(
      `${API_ROUTES.SUPERADMIN_DASHBOARD.DELETE_CATEGORY}${categoryId}`,
      {
        method: "PUT",
        token,
      }
    );
    return response;
  }

  static async addSubcategory(
    payload: addSubcategory
  ): Promise<SubcategoryResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<SubcategoryResponse>(
      API_ROUTES.SUPERADMIN_DASHBOARD.ADD_SUBCATEGORY,
      {
        method: "POST",
        body: payload,
        token,
      }
    );
  }

  static async fetchSubcategoryById(id: string): Promise<SingleSubcategoryResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<SingleSubcategoryResponse>(
      `${API_ROUTES.CATEGORY.FETCH_SUB_CATEGORY_BY_ID}${id}`,
      {
        method: "GET",
        token,
      }
    );
  }

  
}
