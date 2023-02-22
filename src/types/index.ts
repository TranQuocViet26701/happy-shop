export type User = {
  blocked?: boolean;
  confirmed: boolean;
  created_at: string;
  created_by?: string;
  email: string;
  fullName: string;
  id: number;
  provider: string;
  role: any;
  updated_at: string;
  updated_by?: User;
  username: string;
};

export type Category = {
  id: number;
  name: string;
  searchTerm: string;
  updated_at: string;
  updated_by?: User;
  created_at: string;
  created_by?: User;
};

export type Product = {
  id: number;
  category: Category;
  created_at: string;
  created_by?: User;
  description?: string;
  isFreeShip: boolean;
  isPromotion: boolean;
  name: string;
  originalPrice: number;
  productId: number;
  promotionPercent: number;
  salePrice: number;
  shortDescription: string;
  thumbnail?: any;
  title: string;
  updated_at: string;
  updated_by?: User;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

export type PaymentOption = 'visa' | 'master-card';

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
