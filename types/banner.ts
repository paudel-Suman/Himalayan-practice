export type bannerType = {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  position: string;
  displayImage: string;
  displayNumber: string;
  displayText: string;
  createdAt: Date;
};

export interface BannerResponse {
  success: boolean;
  statusCode: string;
  message: string;
  data: BannerResponseWithMeta;
}

export type BannerResponseWithMeta = {
  banners: bannerType[];
  meta: Meta;
};
export type Meta = {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  limit: number;
};
