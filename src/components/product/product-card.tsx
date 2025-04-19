import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, BadgeCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="group relative bg-card rounded-lg overflow-hidden border shadow-sm transition-all hover:shadow-md"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block aspect-square overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>

      {/* Quick Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* Wishlist Button */}
        <motion.button
          onClick={handleLike}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "bg-background rounded-full p-2 shadow-sm hover:text-primary transition-colors",
            isLiked && "text-red-500 hover:text-red-600"
          )}
        >
          <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
        </motion.button>

        {/* Quick View Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <Link 
            to={`/products/${product.id}`}
            className="bg-background rounded-full p-2 shadow-sm hover:text-primary transition-colors block"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-muted-foreground mb-1">
          {product.category}
        </div>
        
        {/* Product Name */}
        <Link 
          to={`/products/${product.id}`}
          className="font-medium line-clamp-1 hover:text-primary transition-colors"
        >
          {product.name}
        </Link>
        
        {/* Price and Rating */}
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
            <span className="text-sm">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <div className="mt-3">
          <Button 
            onClick={handleAddToCart}
            className="w-full gap-2"
            variant="outline"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* "Featured" or "In Stock" Badge */}
      {product.featured && (
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
          <BadgeCheck className="h-3 w-3 mr-1" />
          Featured
        </div>
      )}
      
      {/* "Out of Stock" Badge */}
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
            Out of Stock
          </span>
        </div>
      )}
    </motion.div>
  );
}