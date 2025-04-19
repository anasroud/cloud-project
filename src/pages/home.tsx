import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/product/product-card";
import { mockProducts } from "@/data/mock-products";
import { Search, ArrowRight, Tag, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProducts, setFeaturedProducts] = useState(mockProducts.filter(product => product.featured));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            className="max-w-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover Quality Products for Every Lifestyle
            </h1>
            <p className="text-lg mb-8">
              Explore our curated collection of premium products designed to enhance your everyday experiences.
            </p>
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <Input
                type="search"
                placeholder="What are you looking for?"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="lg">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#featured">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black" asChild>
                <a href="#categories">
                  Browse Categories
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-8 w-8 mb-4 text-primary" />,
                title: "Free Shipping",
                description: "Free shipping on all orders over $50",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 mb-4 text-primary" />,
                title: "Secure Payment",
                description: "100% secure payment processing",
              },
              {
                icon: <BadgeCheck className="h-8 w-8 mb-4 text-primary" />,
                title: "Quality Guarantee",
                description: "Only the highest quality products",
              },
              {
                icon: <Tag className="h-8 w-8 mb-4 text-primary" />,
                title: "30-Day Returns",
                description: "Easy returns within 30 days",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-background rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our wide selection of products by category to find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Electronics",
                image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                count: 42,
              },
              {
                name: "Clothing",
                image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                count: 36,
              },
              {
                name: "Home & Garden",
                image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                count: 28,
              },
              {
                name: "Accessories",
                image: "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                count: 24,
              },
              {
                name: "Beauty",
                image: "https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                count: 19,
              },
              {
                name: "Sports",
                image: "https://images.pexels.com/photos/4498562/pexels-photo-4498562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                count: 15,
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                className="group relative h-64 rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 mb-4">{category.count} Products</p>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-black"
                    asChild
                  >
                    <a href={`/products?category=${category.name.toLowerCase()}`}>
                      Shop Now
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out our latest and most popular products that customers love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <a href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-6">
              Subscribe to our newsletter to receive updates on new products, special offers, and exclusive discounts.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter signup
              }}
            >
              <Input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 bg-primary-foreground text-foreground"
              />
              <Button 
                type="submit" 
                variant="secondary"
                className="shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}