import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/cart-drawer";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  Package,
  LogOut,
} from "lucide-react";
import { useAuth } from "react-oidc-context";
import { useCart } from "@/contexts/cart-context";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const auth = useAuth();

  const signOutRedirect = async () => {
    // Remove the user from local session
    await auth.removeUser();

    // Then redirect to Cognito’s logout endpoint
    const clientId = "2g09ceiljspi692sbhvua06jbb";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://us-east-2dmqjk4oau.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // Check if header should be transparent (only on homepage)
  const isHomePage = location.pathname === "/";

  // Change header style when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        {
          "bg-background/80 backdrop-blur-md shadow-sm":
            isScrolled || !isHomePage,
          "bg-transparent": !isScrolled && isHomePage,
        }
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Package className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-xl font-bold">ShopWave</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-start space-x-0">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/products">
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          location.pathname === "/products" &&
                            "font-semibold text-primary"
                        )}
                      >
                        All Products
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Logo */}
          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
  
            {/* Theme Toggle */}
            <ModeToggle />

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>

            {/* User Menu */}
            {auth.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt={auth.user?.profile.name} />
                      <AvatarFallback>{auth.user?.profile.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/orders"
                      className="cursor-pointer flex items-center"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {signOutRedirect()}}
                    className="cursor-pointer text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:flex cursor-pointer"
                onClick={() => auth.signinRedirect()}
              >
                <div>Sign In</div>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-6 space-y-6">
                  <form
                    onSubmit={handleSearch}
                    className="flex w-full relative"
                  >
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>

                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/">Home</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/products">All Products</Link>
                    </Button>
                    <div className="py-2">
                      <h4 className="px-3 text-sm font-medium">Categories</h4>
                      {[
                        "Electronics",
                        "Clothing",
                        "Home & Garden",
                        "Books",
                        "Toys",
                        "Sports",
                      ].map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          className="w-full justify-start pl-6"
                          asChild
                        >
                          <Link
                            to={`/products?category=${category.toLowerCase()}`}
                          >
                            {category}
                          </Link>
                        </Button>
                      ))}
                    </div>
                    {!auth.isAuthenticated ? (
                      <div className="pt-4 flex flex-col gap-2">
                        <Button className="w-full" asChild onClick={() => {
                          auth.signinRedirect
                        }}>
                          <div>Sign In</div>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/register">Create Account</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-4 space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link to="/orders">
                            <Package className="mr-2 h-4 w-4" />
                            Orders
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-destructive"
                          onClick={() => {
                            signOutRedirect();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
    </header>
  );
}
