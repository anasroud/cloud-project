import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/layout";
import HomePage from "@/pages/home";
import ProductsPage from "@/pages/products";
import ProductDetailPage from "@/pages/product-detail";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import NotFoundPage from "@/pages/not-found";
import ProfilePage from "@/pages/profile";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;