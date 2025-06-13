import { API_ROUTES } from "@/constants/apiRoute";
import { MESSAGES } from "@/constants/messages";
import { apiClient } from "@/lib/apiClient";
import { LoginResponse, UserDatailsResponse } from "@/types/auth";
import { ApiResponse } from "@/types/common";
import Cookies from "js-cookie";
export class AuthService {
  static async superadminLogin(payload: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    return await apiClient<LoginResponse>(API_ROUTES.AUTH.SUPERADMIN_LOGIN, {
      method: "POST",
      body: payload,
    });
  }

  static async getUserDetails(): Promise<UserDatailsResponse> {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
    }
    return await apiClient<UserDatailsResponse>(API_ROUTES.AUTH.USER_DETAILS, {
      method: "GET",
      token,
    });
  }

  static async verifyOTP(payload: {
    email: string;
    otp: string;
  }): Promise<LoginResponse> {
    return await apiClient<LoginResponse>(API_ROUTES.AUTH.VERIFY_EMAIL, {
      method: "POST",
      body: payload,
    });
  }
  static async resendEmailVerifyOTP(email: string): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(
      `${API_ROUTES.AUTH.RESEND_VERIFY_EMAIL}/${email}`,
      {
        method: "GET",
      }
    );
  }

  static async sendForgotPasswordLink(email: string): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(
      `${API_ROUTES.AUTH.SEND_FORGOT_PASSWORD_LINK}/${email}`,
      {
        method: "GET",
      }
    );
  }

  static async changePassword(payload: {
    email: string;
    newPassword: string;
    otp: string;
  }): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(`${API_ROUTES.AUTH.CHANGE_PASSWORD}`, {
      method: "PATCH",
      body: payload,
    });
  }

  static async changeForgotPassword(payload: {
    email: string;
    newPassword: string;
    otp: string;
  }): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(
      `${API_ROUTES.AUTH.VERIFY_FORGOT_PASSWORD_OTP}`,
      {
        method: "PATCH",
        body: payload,
      }
    );
  }
}
