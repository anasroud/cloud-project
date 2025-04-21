import { Cart, CartItem, Order, Product } from "@/types";

const API_BASE_URL = "https://api.cloud.anasroud.com";

// Products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

// Products
export async function getProduct(productId: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm: query }),
  });
  if (!response.ok) {
    throw new Error("Failed to search products");
  }
  return response.json();
}

// Cart
export async function getCart(token: string): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  return response.json();
}

export async function updateCart(
  token: string,
  cartItems: CartItem[]
): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: cartItems }),
  });
  if (!response.ok) {
    throw new Error("Failed to update cart");
  }
  return response.json();
}

// Orders
export async function getOrders(token: string): Promise<Order[]> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
}

export async function createOrder(
  token: string,
  productIds: string[]
): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productIds }),
  });
  if (!response.ok) {
    throw new Error("Failed to create order");
  }
  return response.json();
}
