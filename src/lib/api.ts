import { Cart, Order, Product, ApiResponse } from "@/types";
import axios from 'axios';

const API_BASE_URL = "https://api.cloud.anasroud.com";

const API_URL = API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ProductQueryParams {
  offset?: number;
  limit?: number;
  category?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  isInStock?: string;  // "true" or "false"
  orderByPrice?: number; // 0 (asc) or 1 (desc)
  newest?: boolean;
  title:string;
}

export async function getProducts(
  params?: ProductQueryParams
): Promise<ApiResponse<Product[]>> {
  const response = await api.get('/products', { params });
  return response.data;
}

// Products
export async function getProduct(productId: string): Promise<ApiResponse<Product>> {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

export async function getCategories(): Promise<ApiResponse<string[]>> {
  const response = await api.get("/cats");
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
  productId: string
): Promise<ApiResponse<Cart>> {
  const response = await api.post('/cart', { productId: productId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function removeFromCart(
  token: string,
  itemId?: string
): Promise<ApiResponse<Cart>> {
  let request = '';
  if (itemId) {
    request = `/cart/${itemId}/`;
  } else {
    request = '/cart'
  }

  const response = await api.delete(request, {
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
