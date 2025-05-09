import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {ArrowRight, Tag, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

export default function HomePage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
  
    setIsSubscribing(true);
    const loadingToast = toast.loading("Subscribing to newsletter...");
  
    try {
      await api.post('/sub', { email: email });
  
      toast.dismiss(loadingToast);
      toast.success("Successfully subscribed!", {
        description: "Please check your email to confirm your subscription."
      });
      setEmail("");
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.dismiss(loadingToast);
      toast.error("Failed to subscribe", {
        description: error?.response?.data?.error || error.message || "Please try again later."
      });
    } finally {
      setIsSubscribing(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <div className="relative h-[600px] w-full object-cover overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
              alt="Hero"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            className="max-w-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="pt-{1rem} text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ">
              Discover Quality Products for Every Lifestyle
            </h1>
            <p className="text-lg mb-8 pt-{8rem}">
              Explore our curated collection of premium products designed to enhance your everyday experiences
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="opacity-100"
                onClick={() => navigate('/products')}
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Newsletter Section */}
      <section className="py-4 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop"
              alt="Newsletter"
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Subscribe to Our Newsletter
              </h2>
              <p className="mt-4 max-w-2xl text-lg">
                Get the latest updates on new products and special offers.
              </p>
              <form onSubmit={handleSubscribe} className="mt-10 flex w-full max-w-md gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 backdrop-blur-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                />
                <Button 
                  type="submit"
                  className="bg-white text-black hover:bg-white/90"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}