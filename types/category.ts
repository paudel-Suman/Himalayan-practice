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
