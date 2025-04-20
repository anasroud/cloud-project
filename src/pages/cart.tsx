import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "@/components/cart/cart-item";
import { ShoppingCart, ArrowRight, CreditCard, Trash } from "lucide-react";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  
  const handlePromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoCodeApplied(true);
    }
  };
  
  const discount = promoCodeApplied ? totalPrice * 0.1 : 0;
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = totalPrice - discount + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      Items ({totalItems})
                    </h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-muted-foreground"
                      onClick={clearCart}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CartItem item={item} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/50 p-6">
                  <Link 
                    to="/products"
                    className="text-primary hover:underline flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Continue Shopping
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    
                    {promoCodeApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {totalPrice < 50 ? (
                        <span>Free shipping on orders over $50</span>
                      ) : (
                        <span>Your order qualifies for free shipping</span>
                      )}
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(finalTotal)}</span>
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  <form onSubmit={handlePromoCode} className="mb-6">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoCodeApplied}
                        className="flex-1"
                      />
                      <Button 
                        type="submit"
                        variant="outline"
                        disabled={promoCodeApplied}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoCodeApplied && (
                      <p className="text-green-600 text-sm mt-2">
                        Promo code applied successfully!
                      </p>
                    )}
                  </form>
                  
                  <Button 
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/checkout")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                  
                  {!isAuthenticated && (
                    <p className="text-muted-foreground text-sm mt-4 text-center">
                      You'll need to{" "}
                      <Link to="/login" className="text-primary hover:underline">
                        sign in
                      </Link>{" "}
                      during checkout.
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Accepted Payment Methods */}
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-medium mb-2">We Accept</h3>
                <div className="flex items-center justify-between">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
                    alt="Visa" 
                    className="h-8" 
                  />
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
                    alt="Mastercard" 
                    className="h-8" 
                  />
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/196/196566.png" 
                    alt="PayPal" 
                    className="h-8" 
                  />
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/196/196539.png" 
                    alt="American Express" 
                    className="h-8" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}