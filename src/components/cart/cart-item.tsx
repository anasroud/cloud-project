import { useState } from "react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <motion.div 
      className="flex py-4 border-b last:border-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      {/* Product Image */}
      <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
        <Link to={`/products/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <Link 
            to={`/products/${item.id}`}
            className="font-medium line-clamp-1 hover:text-primary transition-colors"
          >
            {item.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">
          {formatCurrency(item.price)}
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-8 w-8 rounded-none rounded-l-md"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-12 rounded-none border-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              className="h-8 w-8 rounded-none rounded-r-md"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="ml-auto font-medium">
            {formatCurrency(item.price * quantity)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}