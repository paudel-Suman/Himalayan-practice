export type BlogCategory = {
  id: string;
  title: string;
  slug: string;
};

export interface BlogResponse {
  success: boolean;
  statusCode: string;
  message: string;

  data: BlogResponseWithMeta;
}

export interface AddBlogCategoryResponse {
  success: boolean;
  statusCode: string;
  message: string;
  category: BlogCategory;
}

export type blogType = {
  id?: string;
  title: string;
  slug?: string;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  categoryId: string;
  category?: BlogCategory;
  seoMeta: SeoType;
};

export type SeoType = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};
export type BlogResponseWithMeta = {
  blogs: blogType[];
  meta: Meta;
};

export type Meta = {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  limit: number;
};

export interface BlogCategoryResponse {
  success: boolean;
  statusCode: string;
  message: string;
  categories: BlogCategory[];
}

export interface AddBlogResponse {
  success: boolean;
  statusCode: string;
  message: string;
  blog: blogType;
}
