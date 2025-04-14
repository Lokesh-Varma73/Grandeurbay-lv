
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  category: string;
  gender: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  isNew?: boolean;
  material?: string;
  tags?: string[];
}

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}
