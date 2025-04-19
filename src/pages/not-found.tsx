import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md"
      >
        <h1 className="text-9xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">
              <Search className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}