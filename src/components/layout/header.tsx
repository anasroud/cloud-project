import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/cart-drawer";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  Package,
  LogOut,
} from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
          "bg-background/80 backdrop-blur-md shadow-sm": isScrolled || !isHomePage,
          "bg-transparent": !isScrolled && isHomePage,
        }
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/products">
                    <NavigationMenuLink className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      location.pathname === "/products" && "font-semibold text-primary"
                    )}>
                      All Products
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                      {["Electronics", "Clothing", "Home & Garden", "Books", "Toys", "Sports"].map((category) => (
                        <li key={category}>
                          <Link to={`/products?category=${category.toLowerCase()}`}>
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">{category}</div>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm">Collections</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      {["New Arrivals", "Best Sellers", "Sale", "Seasonal", "Exclusive"].map((collection) => (
                        <li key={collection}>
                          <Link to={`/products?collection=${collection.toLowerCase().replace(" ", "-")}`}>
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">{collection}</div>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[300px]"
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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile/orders" className="cursor-pointer flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile/wishlist" className="cursor-pointer flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
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
                className="hidden sm:flex"
              >
                <Link to="/login">Sign In</Link>
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
                  <form onSubmit={handleSearch} className="flex w-full relative">
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
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/">Home</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/products">All Products</Link>
                    </Button>
                    <div className="py-2">
                      <h4 className="px-3 text-sm font-medium">Categories</h4>
                      {["Electronics", "Clothing", "Home & Garden", "Books", "Toys", "Sports"].map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          className="w-full justify-start pl-6"
                          asChild
                        >
                          <Link to={`/products?category=${category.toLowerCase()}`}>
                            {category}
                          </Link>
                        </Button>
                      ))}
                    </div>
                    {!isAuthenticated ? (
                      <div className="pt-4 flex flex-col gap-2">
                        <Button className="w-full" asChild>
                          <Link to="/login">Sign In</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/register">Create Account</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-4 space-y-2">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/profile">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/profile/orders">
                            <Package className="mr-2 h-4 w-4" />
                            Orders
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/profile/wishlist">
                            <Heart className="mr-2 h-4 w-4" />
                            Wishlist
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-destructive"
                          onClick={logout}
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