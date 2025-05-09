import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { getCart, removeFromCart, updateCart } from "@/lib/api";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const totalItems = items.reduce((total) => total + 1, 0);
  const totalPrice = items.reduce(
    (total, item) => total + (item?.product.price || 0),
    0
  );

  // Fetch cart on auth state change
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [auth.isAuthenticated]);

  const fetchCart = async () => {
    if (!auth.isAuthenticated || !auth.user?.id_token) return;

    setIsLoading(true);
    try {
      const cart = await getCart(auth.user.id_token || '');
      setItems(cart.data.items || []);
    } catch (error) {
      toast.error("Failed to fetch cart");
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addItem = async (product: Product) => {
    if (!auth.isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    setIsLoading(true);
    try {
      await updateCart(auth.user!.id_token!, product.id);
      await fetchCart();
      toast.success(`Added ${product.title} to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Error adding item to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId?: string) => {
    if (!auth.isAuthenticated) return;

    setIsLoading(true);
    try {
      await removeFromCart(auth.user!.id_token!, cartItemId);
      await fetchCart();
      toast.info("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error("Error removing item from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!auth.isAuthenticated) return;

    setIsLoading(true);
    try {
      await removeItem();
      await fetchCart();
      toast.info("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Error clearing cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
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