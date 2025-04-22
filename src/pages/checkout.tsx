import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  User,
  Home,
  CreditCard,
  Check,
  Lock,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { createOrder } from "@/lib/api";
import { useAuth } from "react-oidc-context";

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const auth = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: auth.user?.profile.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [saveInfo, setSaveInfo] = useState(true);

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateShippingInfo = () => {
    // Basic validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "state",
      "zipCode",
      "phone",
    ];
    return requiredFields.every(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (field) => (shippingInfo as any)[field].trim() !== ""
    );
  };

  const validatePaymentInfo = () => {
    if (paymentMethod === "credit-card") {
      const requiredFields = [
        "nameOnCard",
        "cardNumber",
        "expirationDate",
        "cvv",
      ];
      return requiredFields.every(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (field) => (cardInfo as any)[field].trim() !== ""
      );
    }
    return true; // PayPal doesn't need validation in this example
  };

  const nextStep = () => {
    if (activeStep === 1 && !validateShippingInfo()) {
      toast.error("Please fill all required shipping fields");
      return;
    }

    if (activeStep === 2 && !validatePaymentInfo()) {
      toast.error("Please fill all required payment fields");
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmitOrder = () => {
    // In a real app, you would send data to your backend here
    toast.success("Order placed successfully!");
    await createOrder(auth.user?.id_token || '', items.map(item => item.product.id));
    await clearCart();
    navigate("/");
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    // This would typically be in a useEffect, but for the sake of this example...
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Checkout Steps Indicators */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activeStep >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2">Shipping</span>
            </div>
            <div className="flex-1 flex items-center mx-4">
              <div
                className={`h-1 flex-1 ${
                  activeStep >= 2 ? "bg-primary" : "bg-muted"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activeStep >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2">Payment</span>
            </div>
            <div className="flex-1 flex items-center mx-4">
              <div
                className={`h-1 flex-1 ${
                  activeStep >= 3 ? "bg-primary" : "bg-muted"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activeStep >= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Check className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {/* Step 1: Shipping Information */}
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={nextStep}>Continue to Payment</Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment Information */}
                {activeStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Method
                    </h2>

                    <Tabs
                      defaultValue="credit-card"
                      onValueChange={(value) => setPaymentMethod(value)}
                    >
                      <TabsList className="mb-4">
                        <TabsTrigger value="credit-card">
                          Credit Card
                        </TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>

                      <TabsContent value="credit-card">
                        <div className="space-y-4 mb-6">
                          <div>
                            <Label htmlFor="nameOnCard">Name on Card *</Label>
                            <Input
                              id="nameOnCard"
                              name="nameOnCard"
                              value={cardInfo.nameOnCard}
                              onChange={handleCardInfoChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={cardInfo.cardNumber}
                              onChange={handleCardInfoChange}
                              required
                              placeholder="0000 0000 0000 0000"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expirationDate">
                                Expiration Date *
                              </Label>
                              <Input
                                id="expirationDate"
                                name="expirationDate"
                                value={cardInfo.expirationDate}
                                onChange={handleCardInfoChange}
                                required
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                value={cardInfo.cvv}
                                onChange={handleCardInfoChange}
                                required
                                placeholder="123"
                              />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                              id="saveInfo"
                              checked={saveInfo}
                              onCheckedChange={(checked) =>
                                setSaveInfo(!!checked)
                              }
                            />
                            <Label htmlFor="saveInfo">
                              Save payment information for future purchases
                            </Label>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal">
                        <div className="text-center p-8">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
                            alt="PayPal"
                            className="h-12 mx-auto mb-4"
                          />
                          <p className="mb-4">
                            Click the button below to complete your purchase
                            with PayPal.
                          </p>
                          <Button>Continue with PayPal</Button>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={prevStep}>
                        Back to Shipping
                      </Button>
                      <Button onClick={nextStep}>Review Order</Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Order Review */}
                {activeStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Check className="mr-2 h-5 w-5" />
                      Review Your Order
                    </h2>

                    <div className="space-y-6">
                      {/* Shipping Information Review */}
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <Home className="mr-2 h-4 w-4" />
                          Shipping Information
                        </h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p>
                            {shippingInfo.firstName} {shippingInfo.lastName}
                          </p>
                          <p>{shippingInfo.address}</p>
                          <p>
                            {shippingInfo.city}, {shippingInfo.state}{" "}
                            {shippingInfo.zipCode}
                          </p>
                          <p>{shippingInfo.country}</p>
                          <p>{shippingInfo.phone}</p>
                          <p>{shippingInfo.email}</p>
                        </div>
                      </div>

                      {/* Payment Method Review */}
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Payment Method
                        </h3>
                        <div className="bg-muted p-4 rounded-lg">
                          {paymentMethod === "credit-card" ? (
                            <div className="flex items-center">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
                                alt="Card"
                                className="h-8 mr-2"
                              />
                              <div>
                                <p>{cardInfo.nameOnCard}</p>
                                <p>
                                  **** **** **** {cardInfo.cardNumber.slice(-4)}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
                                alt="PayPal"
                                className="h-8 mr-2"
                              />
                              <p>PayPal</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Items Review */}
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Order Items ({totalItems})
                        </h3>
                        <div className="bg-muted rounded-lg divide-y">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center p-4"
                            >
                              <div className="h-16 w-16 rounded overflow-hidden bg-background flex-shrink-0">
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="font-medium">{item.product.title}</p>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                  <p>
                                    {formatCurrency(item.product.price)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg border border-border flex items-start">
                        <AlertCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-muted-foreground">
                          <p>
                            By placing your order, you agree to our{" "}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={prevStep}>
                        Back to Payment
                      </Button>
                      <Button onClick={handleSubmitOrder}>Place Order</Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({totalItems} items)
                    </span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {totalPrice >= 50 ? "Free" : formatCurrency(5.99)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>{formatCurrency(totalPrice * 0.07)}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>
                      {formatCurrency(
                        totalPrice +
                          (totalPrice >= 50 ? 0 : 5.99) +
                          totalPrice * 0.07
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-4 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 mr-1" />
                  Secure Checkout
                </div>

                <div className="flex items-center justify-between">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
                    alt="Visa"
                    className="h-8"
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/196/196561.png"
                    alt="Mastercard"
                    className="h-8"
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
                    alt="PayPal"
                    className="h-8"
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/196/196539.png"
                    alt="American Express"
                    className="h-8"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
