import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate a random number between min and max (inclusive)
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to filter and sort products based on query parameters
export function filterProducts(products: any[], filters: Record<string, any>) {
  let filteredProducts = [...products];
  
  // Filter by category
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }
  
  // Filter by search query
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        (product.tags && product.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
    );
  }
  
  // Filter by price range
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= filters.minPrice
    );
  }
  
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= filters.maxPrice
    );
  }
  
  // Sort products
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming products have a createdAt field
        if (filteredProducts[0]?.createdAt) {
          filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        break;
      default:
        break;
    }
  }
  
  return filteredProducts;
}