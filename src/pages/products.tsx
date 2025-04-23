import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/product/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search, DollarSign } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Product } from "@/types";
import PaginationComponent from "@/components/PaginationComponent";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  // Get filter values from URL params
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "featured";
  const minPriceParam = searchParams.get("minPrice")
    ? Math.max(0, Number(searchParams.get("minPrice")))
    : 0;
  const maxPriceParam = searchParams.get("maxPrice")
    ? Math.min(1500, Number(searchParams.get("maxPrice")))
    : 1500;

  // Local state for form inputs
  const [category, setCategory] = useState(categoryParam);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sort, setSort] = useState(sortParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceParam,
    maxPriceParam,
  ]);
  const [availableOnly, setAvailableOnly] = useState(false);

  useEffect(() => {
    async function loadCats() {
      try {
        const data = await getCategories();
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }

    loadCats();
  }, []);

  // Get unique categories
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const offset = Number(searchParams.get("offset")) || 0;
        const limit = 10;
        const category = searchParams.get("category") || "";
        const minPrice = searchParams.get("minPrice") || "";
        const title = searchParams.get("title") || "";
        const maxPrice = searchParams.get("maxPrice") || "";
        const isInStock = searchParams.get("isInStock") || "";
        const orderByPrice =
          sort === "price-asc" ? 0 : sort === "price-desc" ? 1 : undefined;
        const newest = sort === "newest" ? true : undefined;

        const query = {
          offset,
          limit,
          category,
          minPrice,
          maxPrice,
          isInStock,
          orderByPrice,
          newest,
          title,
        };

        const result = await getProducts(query);

        setProducts(result.data);
        setCurrentPage(result.meta?.currentPage || 1);
        setTotalNumberOfPages(result.meta?.totalPages || 1);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [searchParams, sort]);

  // Pagination handlers
  const handleNextClick = () => {
    if (currentPage < totalNumberOfPages) {
      const newOffset = currentPage * 10; // assuming limit=10
      const params = new URLSearchParams(searchParams);
      params.set("offset", newOffset.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSearchParams(params);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      const newOffset = (currentPage - 2) * 10; // assuming limit=10
      const params = new URLSearchParams(searchParams);
      params.set("offset", newOffset.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSearchParams(params);
    }
  };

  // Update URL params when filters change
  const applyFilters = async () => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (searchQuery) params.set("title", searchQuery);
    if (sort !== "featured") params.set("sort", sort);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 1500) params.set("maxPrice", priceRange[1].toString());

    setSearchParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    setCategory("");
    setSearchQuery("");
    setSort("featured");
    setPriceRange([0, 1500]);
    setAvailableOnly(false);
    setSearchParams({});
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    const [min, max] = value;
    if (min <= max) {
      setPriceRange([min, max]);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="w-full md:w-64 hidden md:block space-y-6">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="font-semibold text-lg mb-3">Categories</h3>
              <div className="space-y-2">
                <div
                  className={`cursor-pointer hover:text-primary transition-colors ${
                    category === "" ? "text-primary font-medium" : ""
                  }`}
                  onClick={() => setCategory("")}
                >
                  All Categories
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`cursor-pointer hover:text-primary transition-colors ${
                      category === cat.toLowerCase()
                        ? "text-primary font-medium"
                        : ""
                    }`}
                    onClick={() => setCategory(cat.toLowerCase())}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  min={0}
                  max={1500}
                  step={10}
                  onValueChange={handlePriceRangeChange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{formatPrice(Math.min(...priceRange))}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{formatPrice(Math.max(...priceRange))}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Availability</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="availability"
                  checked={availableOnly}
                  onCheckedChange={(checked) => setAvailableOnly(!!checked)}
                />
                <Label htmlFor="availability">In Stock Only</Label>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button className="w-full" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:hidden">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <div className="space-y-6 py-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Categories</h3>
                    <div className="space-y-2">
                      <div
                        className={`cursor-pointer hover:text-primary transition-colors ${
                          category === "" ? "text-primary font-medium" : ""
                        }`}
                        onClick={() => {
                          setCategory("");
                          setMobileFiltersOpen(false);
                        }}
                      >
                        All Categories
                      </div>
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          className={`cursor-pointer hover:text-primary transition-colors ${
                            category === cat.toLowerCase()
                              ? "text-primary font-medium"
                              : ""
                          }`}
                          onClick={() => {
                            setCategory(cat.toLowerCase());
                            setMobileFiltersOpen(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={1500}
                        step={10}
                        onValueChange={handlePriceRangeChange}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{formatPrice(Math.min(...priceRange))}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{formatPrice(Math.max(...priceRange))}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Availability</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="availability-mobile"
                        checked={availableOnly}
                        onCheckedChange={(checked) =>
                          setAvailableOnly(!!checked)
                        }
                      />
                      <Label htmlFor="availability-mobile">In Stock Only</Label>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <SheetClose asChild>
                      <Button className="w-full" onClick={applyFilters}>
                        Apply Filters
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 flex-1">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-[200px]"
              />
              <Button variant="ghost" size="icon" onClick={applyFilters}>
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(category ||
            searchQuery ||
            priceRange[0] > 0 ||
            priceRange[1] < 1500 ||
            availableOnly) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">
                Active Filters:
              </span>

              {category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setCategory("")}
                  />
                </Badge>
              )}

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: {formatPrice(Math.min(...priceRange))} -{" "}
                  {formatPrice(Math.max(...priceRange))}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setPriceRange([0, 1500])}
                  />
                </Badge>
              )}

              {availableOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  In Stock Only
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setAvailableOnly(false)}
                  />
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Products Grid */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              Products
              <span className="text-muted-foreground text-lg font-normal ml-2">
                ({products.length} items)
              </span>
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px]"
                />
                <Button variant="ghost" size="icon" onClick={applyFilters}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <Select
                value={sort}
                onValueChange={(value) => {
                  setSort(value);
                  const params = new URLSearchParams(searchParams);
                  params.set("sort", value);
                  setSearchParams(params);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Top Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              className="text-center py-12 bg-muted rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
      {totalNumberOfPages !== 0 && (
        <div className="mt-5">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalNumberOfPages}
            onNextClick={handleNextClick}
            onPreviousClick={handlePreviousClick}
          />
        </div>
      )}
    </div>
  );
}
