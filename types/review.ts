export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};

export type reviewType = {
  id: string;
  rating: number;
  comment: string;
  images: string[];
  date: string;
  productId: string;
  userId: string;
  user: User;
};
