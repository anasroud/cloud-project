import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  // Scroll to top when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 pt-16"
        >
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster />
    </div>
  );
}