import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Package, Heart, LogOut, CreditCard, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get("order") === "success";
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/profile" } });
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (orderSuccess) {
      toast.success("Your order has been placed successfully!");
    }
  }, [orderSuccess]);
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <div>
                      <User className="mr-2 h-4 w-4" />
                      Account Information
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <div>
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <div>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <div>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {orderSuccess && (
              <motion.div 
                className="bg-green-100 dark:bg-green-900/20 p-6 rounded-lg mb-6 border border-green-200 dark:border-green-800 flex items-start gap-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-green-200 dark:bg-green-800 rounded-full p-2">
                  <Check className="h-5 w-5 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Order Placed Successfully!</h3>
                  <p className="text-green-700 dark:text-green-400 mt-1">
                    Your order has been placed and is being processed. You'll receive an email confirmation shortly.
                  </p>
                </div>
              </motion.div>
            )}
            
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      View and manage your account details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <div className="mt-2 space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Full Name</p>
                              <p className="font-medium">{user.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email Address</p>
                              <p className="font-medium">{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Account Settings</h3>
                        <div className="mt-2 space-y-4">
                          <Button variant="outline">Change Password</Button>
                          <Button variant="outline">Update Personal Information</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Email Preferences</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <p>Promotional emails</p>
                            <Badge variant="outline">Subscribed</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Order notifications</p>
                            <Badge variant="outline">Subscribed</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Newsletter</p>
                            <Badge variant="outline">Subscribed</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      View and track your orders.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orderSuccess ? (
                      <div className="space-y-4">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-muted p-4 flex justify-between items-center">
                            <div>
                              <p className="font-medium">Order #ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
                              <p className="text-sm text-muted-foreground">Placed on {new Date().toLocaleDateString()}</p>
                            </div>
                            <Badge>Processing</Badge>
                          </div>
                          <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-16 w-16 rounded bg-muted mr-4">
                                  <img
                                    src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Product"
                                    className="h-full w-full object-cover rounded"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">Premium Wireless Headphones</p>
                                  <p className="text-sm text-muted-foreground">Qty: 1</p>
                                </div>
                              </div>
                              <p className="font-medium">$249.99</p>
                            </div>
                            <div className="flex items-center justify-between border-t pt-4">
                              <p className="font-medium">Total</p>
                              <p className="font-semibold">$249.99</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button variant="outline" className="flex-1">Track Order</Button>
                              <Button variant="outline" className="flex-1">View Details</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">
                          When you place orders, they will appear here.
                        </p>
                        <Button asChild>
                          <a href="/products">Start Shopping</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Wishlist</CardTitle>
                    <CardDescription>
                      Items you've saved for later.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-4">
                        Save items you love to your wishlist and revisit them anytime.
                      </p>
                      <Button asChild>
                        <a href="/products">Explore Products</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
}