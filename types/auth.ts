export interface LoginResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: Role[];
    avatar?: string;
    token: string;
  };
}
export type Role = {
  id: string;
  name: string;
};


export type RegionalAdminData = {
  id?: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  avatar: string;
  createdAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

export type CustomerData = {
  id?: string;
  name?: string;
  email?: string;
  isActive?: boolean;
  role?: string;
  avatar?: string;
  createdAt?: string;
  regionId?: string;
};

export interface RegionalAdminDataResponse {
  success: boolean;
  statusCode: string;
  message: string;
  regionalAdmins: RegionalAdminData[];
}

export interface RegionResponse {
  success: boolean;
  statusCode: string;
  message: string;
}

export type RegisterUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  regionId?: string;
  isActive?: boolean;
};

export interface CustomerDataResponse {
  success: boolean;
  statusCode: string;
  message: string;
  customers: RegionalAdminData[];
  data: CustomerResponseWithMeta;
}

export interface UserDatailsResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: CustomerData;
}
export type CustomerResponseWithMeta = {
  users: never[];
  customers: CustomerData[];
  meta: Meta;
};

export interface SearchCustomerDataResponse {
  success: boolean;
  statusCode: string;
  message: string;
  customers: CustomerData[];
}
export type Meta = {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  limit: number;
};

export interface RegionBySymbolResponse {
  success: boolean;
  statusCode: string;
  message: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}
