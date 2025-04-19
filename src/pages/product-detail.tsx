import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { mockProducts } from "@/data/mock-products";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/lib/utils";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product/product-card";
import {
  Heart,
  ShoppingCart,
  CheckCircle,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(mockProducts.find(p => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }
  
  // Related products based on category
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Dummy product images (in a real app these would come from the product data)
  const productImages = [
    product.image,
    "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4066196/pexels-photo-4066196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Products */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main Image */}
          <div className="bg-muted rounded-lg overflow-hidden aspect-square relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            
            {/* "Featured" or "In Stock" Badge */}
            {product.featured && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Featured
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2">
            {productImages.map((image, index) => (
              <motion.div
                key={index}
                className={cn(
                  "border-2 rounded cursor-pointer overflow-hidden w-20 h-20",
                  selectedImage === index 
                    ? "border-primary" 
                    : "border-transparent hover:border-muted-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Product Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div>
            <div className="flex items-center mb-2">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              <div className="flex items-center ml-auto">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold">{formatCurrency(product.price)}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center">
            <div 
              className={cn(
                "h-3 w-3 rounded-full mr-2",
                product.stock > 20 
                  ? "bg-green-500" 
                  : product.stock > 0 
                    ? "bg-amber-500" 
                    : "bg-red-500"
              )}
            />
            <span>
              {product.stock > 20 
                ? "In Stock" 
                : product.stock > 0 
                  ? `Low Stock (${product.stock} left)` 
                  : "Out of Stock"}
            </span>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-9 w-9 rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-9 w-12 flex items-center justify-center border-y">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="h-9 w-9 rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              onClick={handleAddToCart} 
              className="flex-1"
              size="lg"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className={cn(
                "flex-1",
                isWishlisted && "text-red-500 hover:text-red-600"
              )}
              onClick={toggleWishlist}
            >
              <Heart 
                className="mr-2 h-4 w-4" 
                fill={isWishlisted ? "currentColor" : "none"} 
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          </div>
          
          {/* Shipping & Returns */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex items-start">
              <Truck className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">On orders over $50. Delivery in 3-5 business days.</p>
              </div>
            </div>
            <div className="flex items-start">
              <RotateCcw className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
              <div>
                <h4 className="font-medium">30-Day Returns</h4>
                <p className="text-sm text-muted-foreground">Return or exchange within 30 days.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
              <div>
                <h4 className="font-medium">Warranty</h4>
                <p className="text-sm text-muted-foreground">1 year warranty on all products.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Product Details Tabs */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <Card>
            <CardContent className="pt-6">
              <TabsContent value="details" className="space-y-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                <p>
                  {product.description}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies
                  lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc sit
                  amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Premium quality materials for durability</li>
                  <li>Designed for maximum comfort and utility</li>
                  <li>Modern aesthetic that fits any style</li>
                  <li>Easy to maintain and clean</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="specifications" className="space-y-4">
                <h3 className="text-lg font-semibold">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Brand</span>
                      <span>ShopWave</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Model</span>
                      <span>SWM-{product.id}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Material</span>
                      <span>Premium</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Color</span>
                      <span>Classic</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Dimensions</span>
                      <span>12" x 8" x 2"</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Weight</span>
                      <span>1.5 lbs</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Warranty</span>
                      <span>1 Year</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Made in</span>
                      <span>USA</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Write a Review
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.round(product.rating)
                            ? "text-amber-500 fill-amber-500"
                            : "text-muted stroke-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-2">based on 24 reviews</span>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[
                    {
                      name: "Sarah J.",
                      rating: 5,
                      date: "2 months ago",
                      comment: "Absolutely love this product! The quality exceeds my expectations and it looks even better in person. Fast shipping too!",
                    },
                    {
                      name: "Michael T.",
                      rating: 4,
                      date: "1 month ago",
                      comment: "Great product for the price. Sturdy construction and beautiful design. The only minor issue was with the packaging, but the product itself is perfect.",
                    },
                    {
                      name: "Emma R.",
                      rating: 5,
                      date: "2 weeks ago",
                      comment: "This has quickly become my favorite purchase of the year. The attention to detail is impressive and it's exactly as described.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.name}</span>
                        <span className="text-muted-foreground text-sm">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= review.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted stroke-muted-foreground"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </motion.div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}