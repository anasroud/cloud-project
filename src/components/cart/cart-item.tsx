import { CartItem as CartItemType } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem } = useCart();

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
        <Link to={`/products/${item.product.id}`}>
          <img
            src={item.product?.imageUrl}
            alt={item.product?.title}
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
            {item.product?.title}
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
          {formatCurrency(item.product?.price || 0)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center">
          <div className="ml-auto font-medium">
            {formatCurrency(item.product?.price)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
