import { Product } from "@/types";

// Helper function to create product IDs
const createId = (index: number): string => {
  return `prod-${index.toString().padStart(4, '0')}`;
};

export const mockProducts: Product[] = [
  {
    id: createId(1),
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation, 30-hour battery life, and comfortable ear cups for extended wear.",
    price: 249.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    rating: 4.8,
    stock: 45,
    tags: ["headphones", "wireless", "audio", "premium"],
    featured: true
  },
  {
    id: createId(2),
    name: "Slim Fit Denim Jacket",
    description: "A modern take on the classic denim jacket. This slim-fit design offers both style and comfort for any casual occasion.",
    price: 89.95,
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Clothing",
    rating: 4.5,
    stock: 62,
    tags: ["jacket", "denim", "fashion", "casual"]
  },
  {
    id: createId(3),
    name: "Smart Home Security Camera",
    description: "Keep your home safe with 24/7 monitoring. Features include HD video, night vision, motion detection, and smartphone alerts.",
    price: 129.99,
    image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    rating: 4.7,
    stock: 27,
    tags: ["security", "camera", "smart home", "wifi"]
  },
  {
    id: createId(4),
    name: "Ergonomic Office Chair",
    description: "Work in comfort with our ergonomic office chair. Designed to support proper posture and reduce back pain during long work hours.",
    price: 349.99,
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Home & Garden",
    rating: 4.9,
    stock: 13,
    tags: ["furniture", "office", "chair", "ergonomic"],
    featured: true
  },
  {
    id: createId(5),
    name: "Classic Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection. Features multiple card slots and a sleek, timeless design.",
    price: 59.95,
    image: "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Accessories",
    rating: 4.6,
    stock: 89,
    tags: ["wallet", "leather", "accessories", "men"]
  },
  {
    id: createId(6),
    name: "Professional DSLR Camera",
    description: "Capture stunning photos with this professional-grade DSLR camera. Includes multiple lenses and accessories for any photography need.",
    price: 1299.99,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    rating: 4.9,
    stock: 7,
    tags: ["camera", "photography", "professional", "dslr"],
    featured: true
  },
  {
    id: createId(7),
    name: "Organic Cotton T-Shirt",
    description: "Eco-friendly and ultra-soft organic cotton t-shirt. Available in multiple colors for everyday comfort and style.",
    price: 29.95,
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Clothing",
    rating: 4.3,
    stock: 124,
    tags: ["tshirt", "organic", "sustainable", "casual"]
  },
  {
    id: createId(8),
    name: "Fitness Smartwatch",
    description: "Track your health and fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and personalized workout programs.",
    price: 199.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    rating: 4.7,
    stock: 35,
    tags: ["smartwatch", "fitness", "wearable", "health"]
  },
  {
    id: createId(9),
    name: "Luxury Scented Candle Set",
    description: "Transform your home with this set of three luxury scented candles. Each candle is hand-poured with premium natural ingredients.",
    price: 49.99,
    image: "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Home & Garden",
    rating: 4.8,
    stock: 52,
    tags: ["candles", "home decor", "scented", "luxury"]
  },
  {
    id: createId(10),
    name: "Stainless Steel Water Bottle",
    description: "Stay hydrated with our insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.95,
    image: "https://images.pexels.com/photos/4000094/pexels-photo-4000094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Sports",
    rating: 4.4,
    stock: 76,
    tags: ["water bottle", "hydration", "insulated", "eco-friendly"]
  },
  {
    id: createId(11),
    name: "Bluetooth Portable Speaker",
    description: "Take your music anywhere with this waterproof portable speaker. Features powerful bass, 20-hour battery life, and compact design.",
    price: 79.99,
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    rating: 4.5,
    stock: 48,
    tags: ["speaker", "bluetooth", "portable", "waterproof"]
  },
  {
    id: createId(12),
    name: "Leather Crossbody Bag",
    description: "Stylish and practical leather crossbody bag with adjustable strap and multiple compartments for organization.",
    price: 119.95,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Accessories",
    rating: 4.6,
    stock: 21,
    tags: ["bag", "leather", "crossbody", "fashion"],
    featured: true
  },
  {
    id: createId(13),
    name: "Bestselling Novel Collection",
    description: "A collection of five bestselling novels from acclaimed authors. Perfect for book lovers or as a thoughtful gift.",
    price: 89.99,
    image: "https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Books",
    rating: 4.8,
    stock: 17,
    tags: ["books", "novels", "reading", "collection"]
  },
  {
    id: createId(14),
    name: "Yoga Mat Premium",
    description: "High-density, non-slip yoga mat for enhanced comfort and stability during your practice. Includes carrying strap.",
    price: 45.99,
    image: "https://images.pexels.com/photos/4498562/pexels-photo-4498562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Sports",
    rating: 4.7,
    stock: 39,
    tags: ["yoga", "fitness", "exercise", "mat"]
  },
  {
    id: createId(15),
    name: "Robot Vacuum Cleaner",
    description: "Smart robot vacuum with mapping technology, powerful suction, and app control for effortless home cleaning.",
    price: 299.99,
    image: "https://images.pexels.com/photos/844874/pexels-photo-844874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Home & Garden",
    rating: 4.6,
    stock: 14,
    tags: ["vacuum", "robot", "smart home", "cleaning"],
    featured: true
  },
  {
    id: createId(16),
    name: "Wooden Chess Set",
    description: "Handcrafted wooden chess set with intricately designed pieces. Perfect for chess enthusiasts of all skill levels.",
    price: 79.95,
    image: "https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Toys",
    rating: 4.9,
    stock: 8,
    tags: ["chess", "board game", "wooden", "strategy"]
  },
  {
    id: createId(17),
    name: "Artisanal Coffee Gift Set",
    description: "Premium coffee beans from around the world, packaged with a ceramic mug and brewing accessories.",
    price: 69.99,
    image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Food & Drink",
    rating: 4.8,
    stock: 23,
    tags: ["coffee", "gift set", "gourmet", "artisanal"]
  },
  {
    id: createId(18),
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless gaming mouse with programmable buttons and customizable RGB lighting.",
    price: 89.99,
    image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    rating: 4.5,
    stock: 32,
    tags: ["gaming", "mouse", "wireless", "rgb"]
  },
  {
    id: createId(19),
    name: "Designer Sunglasses",
    description: "UV-protective designer sunglasses with a classic, timeless design that complements any style.",
    price: 159.95,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Accessories",
    rating: 4.7,
    stock: 18,
    tags: ["sunglasses", "designer", "fashion", "UV protection"]
  },
  {
    id: createId(20),
    name: "Organic Skincare Set",
    description: "A complete skincare routine with organic, cruelty-free products for all skin types.",
    price: 129.99,
    image: "https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Beauty",
    rating: 4.8,
    stock: 29,
    tags: ["skincare", "organic", "beauty", "self-care"],
    featured: true
  }
];