import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";

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
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Calculate totals
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Add item to cart
  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        toast.success(`Updated ${product.name} quantity in cart`);
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      toast.info("Item removed from cart");
      return updatedItems;
    });
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
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