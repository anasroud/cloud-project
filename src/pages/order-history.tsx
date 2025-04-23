import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "react-oidc-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Calendar, Package, CheckCircle } from "lucide-react";
import { getOrders } from "@/lib/api";
import { Order } from "@/types";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(auth.user?.id_token || '');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.user?.id_token) {
      fetchOrders();
    }
  }, [auth.user?.id_token]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold mb-8">Order History</h1>
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground mb-4">
                You haven't placed any orders yet. Start shopping to see your order history here.
              </p>
              <Button onClick={() => navigate("/")}>Start Shopping</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="space-y-6">
          {orders.map((order) => {
            const totalPrice = order.products.reduce(
              (sum, product) => sum + product.price * product.quantity,
              0
            );
            const status = "delivered"; // Mock status
            const orderedAt = order.orderedAt ? new Date(order.orderedAt) : new Date();

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {orderedAt.toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.products.map((product) => (
                      <div key={product.id} className="flex items-center">
                        <div className="h-16 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium">{product.title}</p>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <p>{formatCurrency(product.price)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className={`h-5 w-5 mr-2 text-green-500`} />
                        <span className="capitalize">{status}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-lg font-semibold">{formatCurrency(totalPrice)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
