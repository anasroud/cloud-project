import { Cart, CartItem, Order, Product, ApiResponse } from "@/types";
import axios from 'axios';

const API_BASE_URL = "https://cloud.anasroud.com/api";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  const response = await api.get('/products');
  return response.data;
}

// Products
export async function getProduct(productId: string): Promise<ApiResponse<Product>> {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

export async function searchProducts(query: string): Promise<ApiResponse<Product[]>> {
  const response = await api.post('/search', { searchTerm: query });
  return response.data;
}

// Cart
export async function getCart(token: string): Promise<ApiResponse<Cart>> {
  const response = await api.get('/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateCart(
  token: string,
  cartItems: CartItem[]
): Promise<ApiResponse<Cart>> {
  const response = await api.post('/cart', { items: cartItems }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Orders
export const getOrders = async (token: string): Promise<ApiResponse<Order[]>> => {
  const response = await api.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createOrder = async (token: string, productIds: string[]): Promise<ApiResponse<Order>> => {
  const response = await api.post('/orders', { productIds }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getOrder = async (token: string, orderId: string): Promise<ApiResponse<Order>> => {
  const response = await api.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateOrderStatus = async (
  token: string,
  orderId: string,
  status: Order['status']
): Promise<ApiResponse<Order>> => {
  const response = await api.patch(`/orders/${orderId}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
