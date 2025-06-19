import { API_ROUTES } from "@/constants/apiRoute";
import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/apiClient";
import {
  AddBlogResponse,
  BlogCategoryResponse,
  BlogResponse,
  blogType,
} from "@/types/blogs";

import { ApiResponse } from "@/types/common";
import Cookies from "js-cookie";
export class blogService {
  static async fetchAllBlogs(): Promise<BlogResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<BlogResponse>(API_ROUTES.BLOG.FETCH_ALL_BLOG, {
      method: "GET",
      token,
    });
  }
  static async fetchAllCatgories(): Promise<BlogCategoryResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<BlogCategoryResponse>(
      API_ROUTES.BLOG.FETCH_ALL_BLOG_CATEGORY,
      {
        method: "GET",
        token,
      }
    );
  }

  static async addBlog(payload: blogType): Promise<AddBlogResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<AddBlogResponse>(
      API_ROUTES.SUPERADMIN_DASHBOARD.ADD_BLOG,
      {
        method: "POST",
        body: payload,
        token,
      }
    );
  }

  static async updateBlog(payload: blogType): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(
      `${API_ROUTES.SUPERADMIN_DASHBOARD.UPDATE_BLOG}${payload.id}`,
      {
        method: "PATCH",
        body: payload,
        token,
      }
    );
  }

  static async deleteBlog(id: string): Promise<ApiResponse> {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }

    return await apiClient<ApiResponse>(
      `${API_ROUTES.SUPERADMIN_DASHBOARD.DELETE_BLOG}${id}`,
      {
        method: "DELETE",

        token,
      }
    );
  }
}
