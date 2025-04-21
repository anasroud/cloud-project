import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Package, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* About Us */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ShopWave</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Discover a world of quality products curated for your everyday
              needs and special occasions.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Instagram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Twitter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {[
                { label: "All Products", href: "/products" },
                {
                  label: "New Arrivals",
                  href: "/products?collection=new-arrivals",
                },
                {
                  label: "Best Sellers",
                  href: "/products?collection=best-sellers",
                },
                { label: "On Sale", href: "/products?collection=sale" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "FAQs", href: "/faqs" },
                { label: "Shipping & Returns", href: "/shipping" },
                { label: "Track Your Order", href: "/track" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-muted-foreground mb-4">
              Get updates on new products, sales, and more.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter signup
              }}
            >
              <Input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1"
              />
              <Button type="submit" className="shrink-0">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ShopWave. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196561.png"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
              alt="PayPal"
              className="h-6"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196539.png"
              alt="American Express"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
