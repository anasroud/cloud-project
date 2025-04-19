import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import CartItem from "./cart-item";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartDrawer({ open, setOpen }: CartDrawerProps) {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  const handleViewCart = () => {
    setOpen(false);
    navigate("/cart");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Shopping Cart {totalItems > 0 && `(${totalItems})`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-1">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              onClick={() => {
                setOpen(false);
                navigate("/products");
              }}
            >
              Explore Products
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">Calculated at checkout</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <SheetFooter className="flex flex-col gap-2 sm:flex-col mt-4">
              <Button 
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex gap-2 w-full">
                <Button 
                  onClick={handleViewCart}
                  variant="outline"
                  className="flex-1"
                >
                  View Cart
                </Button>
                <Button 
                  onClick={clearCart}
                  variant="outline"
                  className="flex-1"
                >
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}