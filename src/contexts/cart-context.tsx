import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";
import { getCart, updateCart } from "@/lib/api";
import { useAuth } from "./auth-context";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user, getAccessToken } = useAuth();

  // Calculate totals
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fetch cart data when user logs in
  useEffect(() => {
    async function fetchCart() {
      if (user) {
        try {
          const token = await getAccessToken();
          const cartData = await getCart(token);
          setItems(cartData.items);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          toast.error('Failed to load cart data');
        }
      } else {
        setItems([]);
      }
    }
    fetchCart();
  }, [user, getAccessToken]);

  // Update cart on server
  const syncCart = async (newItems: CartItem[]) => {
    if (user) {
      try {
        const token = await getAccessToken();
        await updateCart(token, newItems);
      } catch (error) {
        console.error('Failed to sync cart:', error);
        toast.error('Failed to update cart');
      }
    }
  };

  // Add item to cart
  const addItem = async (product: Product, quantity: number = 1) => {
    const newItems = [...items];
    const existingItemIndex = newItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems.push({ ...product, quantity });
    }

    setItems(newItems);
    await syncCart(newItems);
    toast.success(`Added ${product.name} to cart`);
  };

  // Remove item from cart
  const removeItem = async (productId: string) => {
    const newItems = items.filter(item => item.id !== productId);
    setItems(newItems);
    await syncCart(newItems);
    toast.info('Item removed from cart');
  };

  // Update item quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    const newItems = items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setItems(newItems);
    await syncCart(newItems);
  };

  // Clear cart
  const clearCart = async () => {
    setItems([]);
    await syncCart([]);
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}