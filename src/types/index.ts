export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
  stock: number;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  items?: CartItem[];
}

export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  products?: Product[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}
