// Subcategory type
export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  categoryId: string;
  isActive: boolean;
  createdAt: string;
};

// Main category type
export type categoryType = {
  id: string;
  name: string;
  slug: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  regions: string[];
  subcategories: Subcategory[];
};

export interface CategoryResponse {
  success: boolean;
  statusCode: string;
  message: string;
  categories: categoryType[];
}

export interface AddCategoryResponse {
  success: boolean;
  statusCode: string;
  message: string;
  category: categoryType;
}
export interface SubcategoryResponse {
  success: boolean;
  statusCode: string;
  message: string;
  subcategories: Subcategory[];
}

export type addSubcategory = {
  name?: string;
  categoryId?: string;
};
